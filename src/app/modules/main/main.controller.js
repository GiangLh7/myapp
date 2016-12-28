(function () {
  'use strict';

  angular.module('MainApp').controller('MainController', MainController);
  
  function MainController() {
    var mainVm = this;
    mainVm.navCollapsed = true;
    mainVm.title = "Hi! This is main view";
  }
}) ();