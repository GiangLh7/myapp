(function () {
  'use strict';

  angular.module('shared.widgets').directive('angBreadcrumb', [angBreadcrumb]);

  /**
   * Directive rendering breadcrumb
   * @param $compile
   * @returns {{scope: {callback: string}, link: link}}
   */
  function angBreadcrumb() {
    var directive = {
      restrict: 'AE',
      scope: {
        includeAbstract: '@',
        callback: '&'
      },
      controllerAs: 'vm',
      controller: controller,
      templateUrl: '/modules/shared/widgets/templates/ang-breadcrumb.html'
    };
    return directive;
  }

  controller.$inject = ['$scope', 'BroadcastService', '$state', '$stateParams', '$interpolate'];
  function controller($scope, BroadcastService, $state, $stateParams, $interpolate) {
    var vm = this;

    renderBreadcrumb();

    BroadcastService.on(BroadcastService.eventNames.StateChangedEvent, renderBreadcrumb);
    
    function renderBreadcrumb() {
      vm.steps = getStatesChain()
      angular.forEach(vm.steps, function (step) {
        if (step.breadcrumb && step.breadcrumb.label) {
          var parseLabel = $interpolate(step.breadcrumb.label);
          step.breadcrumbLabel = parseLabel($scope);
        } else {
          var title = (typeof step.title === 'function') ? step.title($scope) : step.title;
          step.breadcrumbLabel = title || step.name;
        }
      });
    }

    function getStatesChain(exitOnFirst) { // Deliberately undocumented param, see getLastStep
      var chain = [];

      // From current state to the root
      for(var stateRef = $state.$current.self.name; stateRef; stateRef=getBreadcrumbParentState(stateRef)) {
        addStateInChain(chain, stateRef);
        if(exitOnFirst && chain.length) {
          return chain;
        }
      }

      // Prefix state treatment
      if($scope.prefixStateName) {
        addStateInChain(chain, $scope.prefixStateName);
      }

      return chain;
    }

    // Get the state for the parent step in the breadcrumb
    function getBreadcrumbParentState(stateRef) {
      var ref = parseStateRef(stateRef),
        state = $state.get(ref.state);

      if(state.breadcrumb && state.breadcrumb.parent) {
        // Handle the "parent" property of the breadcrumb, override the parent/child relation of the state
        var isFunction = typeof state.breadcrumb.parent === 'function';
        var parentStateRef = isFunction ? state.breadcrumb.parent($scope) : state.breadcrumb.parent;
        if(parentStateRef) {
          return parentStateRef;
        }
      }

      return getParentState(state);
    }

    // Get the parent state
    function getParentState(state) {
      // Check if state has explicit parent OR we try guess parent from its name
      var parent = state.parent || (/^(.+)\.[^.]+$/.exec(state.name) || [])[1];
      var isObjectParent = typeof parent === "object";
      // if parent is a object reference, then extract the name
      return isObjectParent ? parent.name : parent;
    }
    
    function addStateInChain(chain, stateRef) {
      var state,
        parentParams,
        ref = parseStateRef(stateRef),
        force = false,
        skip = false;

      for(var i = 0, l = chain.length; i < l; i += 1) {
        if (chain[i].name === ref.state) {
          return;
        }
      }

      state = $state.get(ref.state);
      // Get breadcrumb options
      if(state.breadcrumb) {
        if(state.breadcrumb.force){ force = true; }
        if(state.breadcrumb.skip){ skip = true; }
      }
      if((!state.abstract || $scope.includeAbstract || force) && !skip) {
        if(ref.paramExpr) {
          parentParams = $scope.$eval(ref.paramExpr);
        }

        state.breadcrumbLink = $state.href(ref.state, parentParams || $stateParams || {});
        state.breadcrumbStateRef = stateRef;
        chain.unshift(state);
      }
    }

    function parseStateRef(ref) {
      var parsed = ref.replace(/\n/g, " ").match(/^([^(]+?)\s*(\((.*)\))?$/);
      if (!parsed || parsed.length !== 4) { throw new Error("Invalid state ref '" + ref + "'"); }
      return { state: parsed[1], paramExpr: parsed[3] || null };
    }
  }

})();