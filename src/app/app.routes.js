(function () {
  'use strict';
  angular.module('MainApp').run(mainAppRun);

  mainAppRun.$inject = ['$rootScope', '$injector', '$cookies', '$state', 'BroadcastService', 'PolyglotService'];
  function mainAppRun($rootScope, $injector, $cookies, $state, BroadcastService, PolyglotService) {
    attachStateLoadingRules();

    function attachStateLoadingRules() {
      $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState) {
        $rootScope.title = toState.title;
        BroadcastService.broadcast(BroadcastService.eventNames.StateChangedEvent, {toState: toState, fromState: fromState});
        if (toState.name !== 'error') {
          $cookies.putObject('lastSuccessState', { name: toState.name, params: toParams });
        }
      });

      $rootScope.$on('$stateChangeError',
        function(event, toState, toParams, fromState, fromParams, error) {
          // This event is happened with resolve functions.
          // Here we only care about error codes 401: unauthorized resources and 500: server or application errors
          var status = error ? error.status : 500;
          if (!status || [500, 401].indexOf(status) === -1) {
            status = 500;
          }
          $state.go('error', { code: status });
          event.preventDefault();
        });

      $rootScope.$on('$stateNotFound', function(event, unfoundState, fromState, fromParams) {
        $state.go('error', { code: 404 });
        event.preventDefault();
      });
    }
  }
}) ();