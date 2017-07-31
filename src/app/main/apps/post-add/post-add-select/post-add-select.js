(function() {
    'use strict';

    angular
        .module('app.apps.postAdd.select', [])
        .controller('postAddSelectCtrl', function(
            $scope,
            $timeout,
            navAd,
            $http,
            Upload,
            $window,
            S3Service,
            mainUrl,
            postAddLoc,
            $rootScope,
            $cookies,
            postAddData,
            $location,
            $fb,
            user,
            itemsService
        ) {
            $scope.postAddInfo.title = "Select Category";

            // Full size
            $timeout(function() {
                postAddData.updateHeight();
            });

            // Get categories list
            itemsService.getCategoriesList.async().then(function(data) {
                $scope.CategoriesList = data;
            });

            $scope.showItemCatPopUp = false;
            $scope.selectedItem = {
                id: '',
                subId: ''
            };
            $scope.showSpinnerSubList = false;
            $scope.selectCategory = function(elm) {
                $scope.SubcategoriesList = "";
                $scope.AddItem.subcategory = "";
                $scope.AddItem.openedCatListSubName = "";
                $scope.AddItem.openedCatListName = elm.name;
                $timeout(function() {
                    $scope.AddItem.category = elm.id;
                    $scope.showItemCatPopUp = true;
                    $scope.showSpinnerSubList = true;
                    itemsService.getSubcategoriesList.async(elm.id).then(function(data) {
                        $scope.SubcategoriesList = data;
                        $scope.showSpinnerSubList = false;
                    });
                }, 300);

            }
            $scope.selectSubcategory = function(elm) {
                //$scope.selectedItem.subId = elm.id;
                $scope.AddItem.subcategory = elm.id;
                $scope.AddItem.openedCatListSubName = elm.name;
                $timeout(function() {
                    $scope.showItemCatPopUp = false;
                }, 600);
            }
        })

})();
