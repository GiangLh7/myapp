(function () {
  'use strict';
  angular.module('app.brand').config(brandConfig);

  brandConfig.$inject = ['$stateProvider'];
  function brandConfig($stateProvider) {
    $stateProvider.state('main.brand', {
      controller: 'BrandController',
      controllerAs: 'brandVm',
      title: 'Brand',
      url: '/brand',
      templateUrl: '/modules/brand/views/main.html',
    });
  }
}) ();