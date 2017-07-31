(function() {
  'use strict';

  angular
  .module('app.stackedMenu')
  .controller('stackedMenuController', function(
    $scope, $timeout, $rootScope,
    $element, $transclude,
    $state, $attrs, $parse
  ) {
      var $ctrl = this, // eslint-disable-line angular/controller-as-vm
          nanoDiv = $element.find('.nano'),
          reNano = $ctrl._reNano = function(wait) {
            $timeout(function() {
              nanoDiv.nanoScroller({ alwaysVisible: true });
            }, wait);
          };

      // export the controller on the parent scope attribute specified in the
      // "export-ctrl" attribute. This is besides 'menuCtrl' which is
      // exported on the local scope
      if ($attrs.exportCtrl) {
        $parse($attrs.exportCtrl).assign($scope.$parent, $ctrl);
      }

      $ctrl.levelTemplates = {};
      $ctrl.$parent = $scope.$parent;
      $scope.menuCtrl = $ctrl;
      if ($transclude) {
        $transclude(function(clone, scope) {
          clone.find("[level]").each(function(i, el) {
            var level = el.getAttribute("level");
            $ctrl.levelTemplates[level] = angular.element(el).clone();
          });
          scope.$destroy();
          clone.remove();
        }, null, "itemTemplates");
      }

      $ctrl.$onInit = function() {
        // FIXME this is being done somewhere else
        //$(window).resize(reNano);
        $ctrl.hasHeader = $element.find('menu-header').length > 0 ||
                           $transclude && $transclude.isSlotFilled('menuHeader');
        if (!$ctrl.hasHeader) $element.addClass('noHeader');
        if (!$ctrl.active) $ctrl.active = [];
        if ($ctrl.container) $ctrl.container._registerMenuCtrl($scope);
        $ctrl.toggle($ctrl.getOpened());
      };

      $ctrl.$onChanges = function() {
        // close on choose by default
        if (!angular.isDefined($ctrl.closeOnChoose)) {
          $ctrl.closeOnChoose = true;
        }

        if ($ctrl.filterAllLevels) {
          $ctrl.topItemsOrder = $ctrl.itemsOrder;
          $ctrl.topItemsLimit = $ctrl.itemsLimit;
        }
        reNano();
      }

      var safeConts = [
        $(".topNav")[0],
        $element[0]
      ], len = safeConts.length;
      function onClickOutside(e) {
        for (var i = 0, safe = false; i < len && !safe; i++) {
          safe = safeConts[i] && safeConts[i].contains(e.target);
        }
        if (safe) return;

        $ctrl.setOpened(false);
        document.body.removeEventListener('click', onClickOutside);
      }

      $ctrl.setOpened = function(state) {
        $element.toggleClass('opened', state);
      };

      $ctrl.getOpened = function() {
        return $element.hasClass('opened');
      };

      $ctrl.toggle = function(state) {
        $ctrl.setOpened(state);
        state = $ctrl.getOpened();
        if (state) {
          document.body.addEventListener('click', onClickOutside);
          if ($ctrl.container) {
            $ctrl.container.scrollToTop();
          }
        }
        reNano(450); // NOTE waiting for animation end
      };

      $ctrl.navigate = function (key, obj) {
        angular.copy(angular.equals(key, $ctrl.active) ? [] : key, $ctrl.active);
        $ctrl.onNavigate({key: key, obj: obj, menuCtrl: $ctrl});
        reNano();
        if($rootScope.IsMobileDevice() && !$rootScope.isSearchPage) {
          $('a[aria-controls="tab_browser"]').tab('show');
        }
      };

      $ctrl.choose = function (key, obj) {
        if ($ctrl.closeOnChoose) {
          $ctrl.setOpened(false);
        }
        $ctrl.onChoose({ key: key, obj: obj, menuCtrl: $ctrl});
      };

      $ctrl.getOrLoadMenus = function(key) {
        if (!angular.isArray(key)) throw new Error('no key');

        var menus = $ctrl.menus,
            partialKey = [];

        key.forEach(function(ind) {
          var menuItem = menus[ind];
          if (!menuItem) return;

          partialKey.push(ind);
          menus = menuItem.menus;

          if (!menus && $ctrl.getMenus) {
            menus = menuItem.menus = [];
            menus.loading = true;
            var doLoadMenus = function(data) {
              menus.push.apply(menus, data);
              delete menus.loading;
              reNano();
            };
            var loadedMenus = $ctrl.getMenus(partialKey);
            if (loadedMenus.then) {
              loadedMenus.then(doLoadMenus);
            } else {
              doLoadMenus(loadedMenus);
            }
          }
        });
        reNano();
        return menus;
      };

    /* Add trigger button only on 'On other platforms' */
    if(!$rootScope.IsMobileDevice()) {
        setTimeout(function () {
            var menuHeader = $('.itemsFlat');
            if ( menuHeader[0] && menuHeader[0].className != 'itemsFlat headerWhenStacked ng-isolate-scope') {
                menuHeader.append('<div class="expandBlock">' +
                    '<span class="carret">' +
                    '<i class="fa fa-angle-right" aria-hidden="true"></i>' +
                    '</span>' +
                    '</div>');
            }
            $('.expandBlock').click(function () {
                $('menu-header').trigger('click');
            });
        }, 300);
    }
    });
})();
