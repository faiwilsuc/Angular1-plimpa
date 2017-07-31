(function() {
  'use strict';

  angular
    .module('app.pages.directory')
    .controller('directoryItemsSubcatCtrl', function(
      $scope,
      $timeout,
      $window,
      itemsService,
      $stateParams
    ) {
        console.log($stateParams)
        itemsService.getSubcategoriesList.async($stateParams.id).then(function(data) {
          $scope.subcategoriesList = data;

          //add the cat id's for item's list request in items list ctr
          for (var i = 0; i< $scope.subcategoriesList.length; i++ ){
            $scope.subcategoriesList[i].catId = $stateParams.id;
          }

          console.log($scope.subcategoriesList);
          $scope.loadingList = false;
          $timeout(function() {
            $(".categoriesMenu").nanoScroller();
          });
        });

    })
})();
