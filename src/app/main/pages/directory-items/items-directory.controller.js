(function() {
    'use strict';

    angular
        .module('app.pages.directory')
        .controller('directoryItemsCtrl', function(
            $scope,
            $timeout,
            $window,
            itemsService
        ) {
            // Get categories list
            itemsService.getCategoriesList.async().then(function(data) {
                $scope.categoriesList = data;
                $timeout(function() {
                    console.log($scope.categoriesList)
                        //  or simply update scrollbar
                    $(".categoriesMenu").nanoScroller();
                });
            });


        })
})();
