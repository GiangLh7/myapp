(function () {
  'use strict';
  angular.module('MainApp').config(mainAppConfig);

  mainAppConfig.$inject = ['$qProvider', '$stateProvider', '$urlRouterProvider'];
  function mainAppConfig($qProvider, $stateProvider, $urlRouterProvider) {
    $qProvider.errorOnUnhandledRejections(false);
    $urlRouterProvider.otherwise('/');
    $stateProvider.state('main', {
      controller: 'MainController',
      controllerAs: 'vm',
      abstract: true,
      templateUrl: '/layouts/main.html',
      resolve: {
      }
    })/*.state('main.dashboard', {
      controller: 'DashboardController',
      controllerAs: 'dashVm',
      templateUrl: '/modules/dashboard/views/main.pug views/dashboard.html',
      url: '/',
      resolve: {
      }
    }).state('main.books', {
      controller: 'BookController',
      controllerAs: 'bookVm',
      templateUrl: 'views/book.html',
      resolve: {
      }
    }).state('main.brands', {
      controller: 'BrandController',
      controllerAs: 'brandVm',
      templateUrl: 'views/brand.html',
      resolve: {
      }
    })*/;
  }
}) ();