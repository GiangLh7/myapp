(function () {
  angular.module('shared.services').factory('PolyglotService', PolyglotService);
  
  function PolyglotService() {
    return new Polyglot();
  }
}) ();