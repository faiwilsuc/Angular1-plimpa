(function() {
  'use strict';

  angular.module('app.components')
  .component('categoriesMenu', {
    templateUrl: 'app/main/components/categories-menu/categories-menu.html',

    controller: function($scope, itemsService, $timeout, $location) {
      var $ctrl = this;

      // FIXME legacy, needs changing, don' mess with $rootScope
      $scope.$root.startLoadingMain = true;

      itemsService.getCategoriesList.async().then(function(data) {
        $timeout(function() {
          // FIXME legacy, needs changing, don' mess with $rootScope
          $scope.$root.startLoadingMain = false;
        }, 600);
        $ctrl.menus = data;
      });

      $ctrl.getMenus = function(key) {
        if (key.length == 1) {
          var menu = $ctrl.menus[key[0]];
          return itemsService.getSubcategoriesList.async(menu.id);
        }
      };

      $ctrl.onChoose = function(key, cat) {
        var menu = $ctrl.menus[key[0]];
        // FIXME use ui-router $state.go(). For unknown reason its not working from here.
        // $state.go("home.subcat", { "id": menu.id, "subId": cat.id}, { notify: false });

        $location.path("/categories/" + menu.id + "/" + cat.id);
      };
    }
  });
})();
