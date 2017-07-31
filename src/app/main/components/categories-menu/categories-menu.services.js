(function() {
    'use strict';

    angular
        .module('app.components')
        // FIXME most of this stuff is useless, but need to remove external references
        // NOTE only subItemOrder and limitSubData are useful, but need to be
        // moved anyway
        .service('categoriesMenuService', function($window, $timeout) {
            var mainHeight = 120,
                innerHeight = 180,
                curRemoveVal = mainHeight,
                limitSubData = 10,
                subItemOrder = {
                    toggles: "",
                    val: "timestamp",
                    reverse: true
                };

            angular.element($window).resize(function() {
              _updateHeight(curRemoveVal);
            });

            function _updateHeight(removeVal) {
              // FIXME FIXME FUXME FIXME
              // this is mostly not necessary, in fact this whole service is unnecessary
              // but it remains for legacy reasons, until a brave soul removes it
              var categoriesMenu = $(".categoriesMenu");
              //categoriesMenu[0].style.height = ($window.innerHeight - removeVal) + "px";
              $timeout(function() { categoriesMenu.nanoScroller({ alwaysVisible: true }); }, 500);
            }

            function updateHeight() {
              curRemoveVal = mainHeight;
              return _updateHeight(mainHeight);
            }

            function updateHeightItemList() {
              curRemoveVal = innerHeight;
              return _updateHeight(innerHeight);
            }

            return {
                updateHeight: updateHeight,
                updateHeightItemList: updateHeightItemList,
                limitSubData: limitSubData,
                subItemOrder: subItemOrder
            }
        });
})();
