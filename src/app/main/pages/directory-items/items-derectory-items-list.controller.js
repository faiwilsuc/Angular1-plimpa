(function() {
  'use strict';

  angular
    .module('app.pages.directory')
    .controller('directoryItemsListCtrl', function(
      $scope,
      $timeout,
      $window,
      itemsService,
      $stateParams,
      categoriesMenuService,
      $filter,
      $state
    ) {

      $scope.limitSubData = categoriesMenuService.limitSubData;

      // Get items list
      itemsService.getCategoriesSubListElms.async($stateParams.catId, $stateParams.subId).then(function(data) {
        $scope.itemsList = data;
      });

      $scope.openItem = function(id, title){
        $state.go("home.item.info", { "itemId": id, "itemNameSlug": $filter('slugify')(title) })
      }
    })
})();
