(function () {
  'use strict';
  angular.module('app.book').controller('BookDetailsController', BookDetailsController);

  BookDetailsController.$inject = ['$rootScope', 'bookObj'];
  function BookDetailsController($rootScope, bookObj) {
    var vm = this;
    vm.book = bookObj;
    $rootScope.title = vm.book.title;
  }
}) ();