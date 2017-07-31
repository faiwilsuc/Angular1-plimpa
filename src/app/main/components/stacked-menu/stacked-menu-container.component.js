/**
 * Stacked Menu Container
 *
 * @name stackedMenuContainer
 * @desc This component facilitates the stacking behavior for <stacked-menu>
 *
 */

(function() {
  'use strict';

  angular
  .module('app.stackedMenu')
  .component('stackedMenuContainer', {
    template: '<ng-transclude></ng-transclude><div class="mainContent"></div>',
    transclude: {
      mainContent: '?mainContent',
    },
    controller: function($scope, $document, $element, $timeout, $transclude) {
      var $ctrl = this,
          scrollCont = $document,
          mainContent = $element.find('.mainContent');

      $ctrl._menuCtrls = {};
      $ctrl._registerMenuCtrl = function(scope) {
        $ctrl._menuCtrls[scope.$id] = scope.menuCtrl;

        scope.$on('$destroy', function() { delete $ctrl._menuCtrls[scope.$id] });
      };
      var forEachMenu = angular.forEach.bind(angular, $ctrl._menuCtrls);

      $ctrl.stickyMenus = $ctrl.atBottom = false;

      $transclude(function(clone, scope) {
        mainContent.append(clone);
      }, mainContent, 'mainContent');

      $ctrl.scrollToTop = function() {
        $ctrl.scrollingToTop = true;
        scrollCont.duScrollToElementAnimated($element).then(function() {
          $timeout(function() { $ctrl.scrollingToTop = false; }, 250);
        });
      };

      scrollCont.scroll(function(e) {
        var rekt = $element[0].getBoundingClientRect(),
            state = {
              stickyMenus: rekt.top <= 0,
              atBottom   : rekt.bottom <= 0
            };
        Object.keys(state).forEach(function(s) {
          if ($ctrl[s] != state[s]) {
            $ctrl[s] = state[s];
            $element.toggleClass(s, state[s]);
          }
        });
        /**
         * FIXME this code closes the menu on scroll, if we are not in the state
         * of scrolling up. But it does so too eagerly, so you end up closing
         * the menu by mistake while scrolling it
         *
        if (!$ctrl.scrollingToTop) {
          forEachMenu(function(menuCtrl) {
            menuCtrl.setOpened(false);
          });
        }
        */
      });
    }
  });
})();
