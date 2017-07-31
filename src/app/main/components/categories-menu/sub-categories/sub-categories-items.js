(function() {
    'use strict';

    angular
        .module('app.subCategories', [])
        .controller('subCategoriesItemCtrl', function(
            $scope,
            $timeout,
            $window,
            itemsService,
            mpService,
            $state,
            $rootScope,
            $location,
            mapCons,
            categoriesMenuService,
            $filter
        ) {
            // filtering items watch
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

            $scope.openedElmDatas;
            $scope.openedElmDatasLoading = false;

            function loadSubLists() {
                // Divide the urls to different categories
                var tb = $location.path(),
                    Id = tb.split("/")[2],
                    subId = tb.split("/")[3],
                    trim = tb.split("/")[4] + "",
                    nTrim = '';
                for (var i = 0; i < trim.length; i++) {
                    if (trim[i] == "_") {
                        nTrim = nTrim + ' '
                    } else {
                        nTrim = nTrim + trim[i]
                    };
                }
                $scope.nTrim = nTrim;

                // Get datas from the server
                itemsService.getCategoriesSubListElms.async(Id, subId).then(function(data) {
                    $scope.openedElmDatasLoading = true;
                    $scope.openedElmDatas = data;
                    var indElm = _.findIndex(data, { 'itemTitle': nTrim });
                    $scope.$watch(function() {
                        return mapCons.loadedFinished
                    }, function(newVal) {
                        if (newVal) {
                            mpService.highlightIconAndOpenIW(data[indElm].itemId, data[indElm].condoId, $scope);
                        };
                    }, true);

                    categoriesMenuService.updateHeight();
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

            // Checking the state if state equals to desired value load the items from data
            // according to url value
            if ($state.current.name == 'home.item') {
                $timeout(function() {
                    loadSubLists()
                });
            };

            // Going back to the menu sublist by changing url
            $scope.goBackSubList = function() {
                // $scope.openElms = false;
                // var replacedVal = _.trimStart($location.path(), '/categories/');
                // var Id = replacedVal.substring(0, replacedVal.indexOf('/'));
                // $state.go("home.id", { "id": Id });
                $state.go("home");
            }



            // When clicked in item show it from the map
            $scope.showInMap = function(elm, index) {

                console.log("JHFIHIHEIUHIFHWIUFHIHGIOVHEIGHIOEHGOIEWHJGOHJEOGHIOWGHIOUEHWGIOHWIOGHIOUEHGIO")
                console.log(elm)
                $scope.subItem = index;
                // $state.go("home.item", { "id": Id, "subId": subId, "itemInfo": nTrim }, { notify: false })
                mpService.highlightIconAndOpenIW(elm.itemId, elm.condoId, $scope);
                $state.go("home.item.info", { "itemId": elm.itemId, "itemNameSlug": $filter('slugify')(elm.itemTitle) }, { notify: false });
                $scope.menuCtrl.setOpened(false);
            };

        })
})();
