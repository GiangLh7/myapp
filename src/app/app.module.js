(function () {
  'use strict';
  angular.module('MainApp', [
    'ngCookies',
    'ui.router',
    'ui.bootstrap',
    'shared.widgets',
    'shared.services',
    'shared.filters',
    // 'app.menu',
    // 'app.user',
    'app.dashboard',
    'app.book',
    'app.brand',
    // 'app.message'
  ]);
}) ();