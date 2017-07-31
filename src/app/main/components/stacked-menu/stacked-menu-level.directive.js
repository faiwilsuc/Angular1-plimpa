/**
 * Stacked Menu Trasclusion Helper
 *
 * @name stackedMenuLevel
 * @desc
 *
 */

(function() {
  'use strict';

  angular
  .module('app.stackedMenu')
  .directive('stackedMenuLevel', function($compile) {
    return {
      require: '^stackedMenu',
      link: function(scope, element, attrs, menuCtrl) {
        var clone = menuCtrl.levelTemplates[attrs.stackedMenuLevel].clone();
        clone.attr('ng-click', attrs.ngClick);
        scope.menuCtrl = menuCtrl;
        scope.$ctrl = menuCtrl.$parent.$ctrl;//debugger;
        element.replaceWith($compile(clone)(scope));
      }
    };
  });
})();
