(function () {

  angular
  .module('shared.services')
  .factory('BroadcastService', BroadcastService);

  BroadcastService.$inject = ['$rootScope', '$timeout'];
  function BroadcastService($rootScope, $timeout) {
    var service = {
      eventNames: {
        UserDataChangedEvent: 'UserDataChangedEvent',
        StateChangedEvent: 'StateChangedEvent',
        LogoutEvent: 'LogoutEvent',
        LoginEvent: 'LoginEvent',
        EmailActivated: 'EmailActivated',
        InfoTipsChangedEvent: 'InfoTipsChangedEvent',
        UrlChangeEvent: 'UrlChangeEvent'
      },
      broadcast: broadcastEvent,
      on: listenEvent,
      disableAutoSaveTimeOut: disableAutoSaveTimeOut,
    };

    return service;

    function broadcastEvent(event, data) {
      $rootScope.$broadcast(event, data);
    }

    function listenEvent(event, callback, scope) {
      var unListenEvent = $rootScope.$on(event, callback);
      if (scope) {
        scope.$on("$destroy", function () {
          unListenEvent();
        });
      }
    }

    function disableAutoSaveTimeOut() {
      /* using to clear autosave when click save button */
      if($rootScope.timeout) {
        $timeout.cancel($rootScope.timeout);
      }
    }
  }
})();