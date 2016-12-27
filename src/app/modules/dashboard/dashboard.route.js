(function () {
  'use strict';
  angular.module('app.dashboard').config(dashboardConfig);

  dashboardConfig.$inject = ['$stateProvider'];
  function dashboardConfig($stateProvider) {
    $stateProvider.state('main.dashboard', {
      controller: 'DashboardController',
      controllerAs: 'dashboardVm',
      title: 'Dashboard',
      templateUrl: '/modules/dashboard/views/main.html',
    });
  }
}) ();