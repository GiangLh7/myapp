(function () {
  'use strict';
  angular.module('MainApp').config(mainAppConfig);

  mainAppConfig.$inject = ['$qProvider', '$stateProvider', '$urlRouterProvider', '$locationProvider'];
  function mainAppConfig($qProvider, $stateProvider, $urlRouterProvider, $locationProvider) {
    $qProvider.errorOnUnhandledRejections(false);
    $urlRouterProvider.otherwise('/');
    $stateProvider.state('main', {
      controller: 'MainController',
      controllerAs: 'vm',
      abstract: true,
      title: 'Home',
      templateUrl: '/layouts/main.html',
      resolve: {
      }
    });

    // use the HTML5 History API
    $locationProvider.html5Mode(true);
  }
}) ();