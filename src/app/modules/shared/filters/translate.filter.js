(function () {
  angular.module('shared.filters').filter('translate', TranslateFilter);
  
  function TranslateFilter(PolyglotService) {
    return function(input) {
      return PolyglotService.t(input);
    };
  }
}) ();