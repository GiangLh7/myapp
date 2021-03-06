(function () {
  'use strict';
  angular.module('app.book').config(bookConfig);

  bookConfig.$inject = ['$stateProvider'];
  function bookConfig($stateProvider) {
    $stateProvider.state('main.book', {
      controller: 'BookController',
      controllerAs: 'bookVm',
      title: 'Books',
      url: '/books',
      templateUrl: '/modules/book/views/main.html',
    })
    .state('main.book-detail', {
      url: '/books/{bookId:string}/{section:string}',
      templateUrl: '/modules/book/views/book-detail.html',
      title: function (dependencies) {
        var $state = dependencies.$state;
        var resolveData = $state.$current.locals.resolve.$$values;
        var book = resolveData.bookObj;
        return book ? book.title : 'Book detail';
      },
      dependencies: ['$state'],
      breadcrumb: {
        label: '{{$root.title}}',
        parent: 'main.book'
      },
      controller: 'BookDetailsController',
      controllerAs: 'vm',
      params: {
        section: {value: null, squash: true}
      },
      resolve: {
        bookObj: bookResolver,
      },
    });

    function bookResolver($stateParams, BookService, $q) {
      return $q(function(resolve, reject) {
        resolve(BookService.getBook($stateParams.bookId));
      });
    }
  }
}) ();