(function () {
  'use strict';
  angular.module('app.book').config(bookConfig);

  bookConfig.$inject = ['$stateProvider'];
  function bookConfig($stateProvider) {
    $stateProvider.state('main.book', {
      controller: 'BookController',
      controllerAs: 'bookVm',
      title: 'Books',
      url: '/book',
      templateUrl: '/modules/book/views/main.html',
    });
  }
}) ();