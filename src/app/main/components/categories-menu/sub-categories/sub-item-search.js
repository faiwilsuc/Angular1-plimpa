(function() {
    'use strict';

    angular
        .module('app.subCategories')
        .controller('subItemSearchCtrl', function(
            $scope,
            $timeout,
            itemsService,
            mpService,
            $state,
            $location,
            mapCons,
            $stateParams,
            categoriesMenuService
        ) {
            // Watching changes to filter item
            $scope.$watch(function() {
                return categoriesMenuService.subItemOrder
            }, function(newVal) {
                $scope.subItemOrder = newVal;
            })

            // Update height
            categoriesMenuService.updateHeightItemList();

            // Search limit
            $scope.limitSubData = categoriesMenuService.limitSubData;
            $scope.loadMoreSub = function(val) {
                $scope.limitSubData = $scope.limitSubData + val;
                categoriesMenuService.updateHeightItemList();
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
                    $scope.menuCtrl.setOpened(true);
                }, 200);
                $scope.menuCtrl.setOpened(true);
            }

            // Loading sublist data by searching from the server with the data of url values
            $scope.openedElmDatas;
            $scope.openedElmDatasLoading = false;

            function loadSubLists() {
                var the_country = 'TH',
                    the_city = '',
                    the_title = $stateParams.keyword,
                    the_category = '',
                    the_subcategory = '';

                itemsService
                    .search
                    .async(the_country, the_city, the_title, the_category, the_subcategory)
                    .then(function(res) {
                        // var indElm = _.findIndex(res, { 'itemTitle': nTrim });
                        // $scope.$watch(function() {
                        //     return mapCons.loadedFinished
                        // }, function(newVal) {
                        //     if (newVal) {
                        //         mpService.highlightIconAndOpenIW(res[indElm].itemId, res[indElm].condoId, $scope);
                        //     };
                        // }, true);

                        $scope.openedElmDatasLoading = true;
                        $scope.openedElmDatas = res;
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
            }

            // Checking the url and loading the search results
            if ($state.current.name == 'home.item.search' || $state.current.name == 'home.item.searchVal') {
                $timeout(function() {
                    loadSubLists()
                });
            };

            // Going back to the homepage
            $scope.goBackSubList = function() {
                // $scope.openElms = false;
                $state.go("home");
            }

            $scope.showOtherPlatformsMobile = function() {
              $('a[aria-controls="tab_around"]').tab('show');
            };

            // Show the item in the map
            $scope.showInMap = function(elm, index) {
                console.log("FNJDOKJNFOSJOFIJSOJFDOSJDFOIJDSFJO")
                // Divide the url
                var tb = $location.path(),
                    Id = tb.split("/")[2],
                    subId = tb.split("/")[3],
                    trim = elm.itemTitle,
                    nTrim = '';

                for (var i = 0; i < trim.length; i++) {
                    if (trim[i] == " ") {
                        nTrim = nTrim + '_'
                    } else {
                        nTrim = nTrim + trim[i]
                    };
                }
                $scope.nTrim = nTrim;
                $scope.subItem = index;
                $state.go("home.item.searchVal", { "id": Id, "val": nTrim }, { notify: false });
                mpService.highlightIconAndOpenIW(elm.itemId, elm.condoId, $scope);
                $scope.menuCtrl.setOpened(false);
            };
        })
})();
