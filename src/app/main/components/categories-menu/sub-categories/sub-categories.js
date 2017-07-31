(function() {
    'use strict';

    angular
        .module('app.subCategoriesItem', [])
        .controller('subCategoriesCtrl', function(
            $scope,
            $timeout,
            itemsService,
            mpService,
            $state,
            $rootScope,
            $stateParams,
            $filter,
            mapCons,
            categoriesMenuService
        ) {
            // Watching filters order change
            $scope.$watch(function() {
                return categoriesMenuService.subItemOrder
            }, function(newVal) {
                $scope.subItemOrder = newVal;
            });

            // Update height
            categoriesMenuService.updateHeightItemList();

            // Search limit
            $scope.limitSubData = categoriesMenuService.limitSubData;
            $scope.loadMoreSub = function(val) {
                $scope.limitSubData = $scope.limitSubData + val;
                categoriesMenuService.updateHeightItemList();
                $scope.menuCtrl.setOpened(true);
            }

            // checking the route and loading the data from the server
            $scope.openedElmDatasLoading = false;
            if ($state.current.name == 'home.subcat') {
                // Getting the data from the server according to url
                // $scope.openElms = false;
                itemsService.getCategoriesSubListElms.async($stateParams.id, $stateParams.subId).then(function(data) {
                    $scope.openedElmDatasLoading = true;
                    $scope.openedElmDatas = data;
                    // $scope.openElms = true;
                    $timeout(function() {
                        $(".categoriesMenu").nanoScroller();
                    });
                    $timeout(function() {
                        $('.subCategoriesContImgDel').each(function() {
                            var vm = this;
                            $(vm).magnificPopup({
                                delegate: '.magnificImg',
                                type: 'image',
                                gallery: {
                                    enabled: true
                                }
                            });
                        });
                    }, 200);
                });
            };

            // Going back sublist categories by changing the url
            $scope.goBackSubList = function() {
                $state.go("home");
            }

            // Showing item from the map
            $scope.showInMap = function(elm, index) {
                $scope.menuCtrl.setOpened(false);
            };
        })
})();
