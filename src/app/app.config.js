(function () {
  'use strict';
  angular.module('MainApp').config(mainAppConfig);

  mainAppConfig.$inject = ['$urlRouterProvider', '$state']
  function mainAppConfig($urlRouterProvider, $state) {
    $urlRouterProvider.otherwise(function () {
      $state.transitionTo("main.dashboard");
    });
  }
}) ();