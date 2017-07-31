/*
 * Compatibility layer for use on older menu that have not been migrated to use
 * the <stacked-menu> component
 */


(function() {
  'use strict';

  angular
  .module('app.stackedMenu')
  .directive('stackedMenuCompat', function() {
    return {
      require: '^?stackedMenuContainer',
      controller: 'stackedMenuController',
      link: function($scope, elm, attrs, containerCtrl) {
        $scope.menuCtrl.container = containerCtrl;
        if (containerCtrl) containerCtrl._registerMenuCtrl($scope);
        $scope.menuCtrl._reNano(1000); // because compat wtf
      }
    };
  });
})();
