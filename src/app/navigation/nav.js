(function() {

    'use strict';

    angular
        .module('app.navigation', [])
        .controller('NavigationController', NavigationController)
        .controller('SortController', SortController)
    function NavigationController(
        $scope,
        user,
        utilsService,
        $state,
        mpService,
        mapCons,
        sideBarNav,
        responseWait,
        $filter
    ) {
        $scope.lngVal = {
            active: 'en'
        }
        $scope.user = user;

        // Watching respone wait
        $scope.$watch(function() {
            return responseWait;
        }, function(newVal) {
            $scope.responseWait = newVal.status;
        }, true);

        $scope.$watch(function() {
          return mapCons.map
        }, function(newVal) {
          if (newVal) {
            InitializeSearch(mapCons.map);
          };
        });

        $scope.sideBarNav = sideBarNav;

        $scope.goHome = function() {
            $state.go("home");
            mpService.setCenter();
        }


        $scope.isUserIn = false;

        $scope.$watch(function() {
            return user;
        }, function(newVal) {
            $scope.user = newVal;
        }, true);

        $scope.resultItems = '';
        $scope.search = { keywords: '' };

        $scope.searchFormSubmit = function() {
          if ($scope.search.keywords != '') {
            $state.go("home.item.search", { "keyword": $filter('slugify')($scope.search.keywords) })
          };
        };

        $scope.searchFieldKeyup = function(e) {
          if (e.keyCode == 13) {
            $scope.searchFormSubmit();
          }
        };

        $scope.$watch('search.keywords', function(el) {
            if (!el) {
                $scope.resultItems = '';
            };
        });

        $scope.logOut = function() {
            user = {}
            utilsService.logOut();
        }

    }

    function SortController($scope, categoriesMenuService) {
        $scope.navSubOptions = [{
            id: "itemPrice",
            name: "HEADER.FILTER_PRICE.NAME",
            filtersName: [{
                name: "HEADER.FILTER_PRICE.SORT",
                pr: 1,
                id: true
            }, {
                name: "HEADER.FILTER_PRICE.REVERT",
                pr: 2,
                id: false
            }],
            up: "HEADER.FILTER_PRICE.SORT",
            down: "HEADER.FILTER_PRICE.REVERT"
        }, {
            id: "itemTitle",
            name: "HEADER.FILTER_NAME.NAME",
            filtersName: [{
                name: "HEADER.FILTER_NAME.REVERT",
                pr: 2,
                id: true
            }, {
                name: "HEADER.FILTER_NAME.SORT",
                pr: 1,
                id: false
            }],
            up: "HEADER.FILTER_NAME.REVERT",
            down: "HEADER.FILTER_NAME.SORT"
        }, {
            id: "timestamp",
            name: "HEADER.FILTER_DATE.NAME",
            filtersName: [{
                name: "HEADER.FILTER_DATE.SORT",
                pr: 2,
                id: true
            }, {
                name: "HEADER.FILTER_DATE.REVERT",
                pr: 1,
                id: false
            }],
            up: "HEADER.FILTER_DATE.SORT",
            down: "HEADER.FILTER_DATE.REVERT"
        }];
        $scope.parentDropDown = false;
        $scope.filterType = 'New to Old';
        $scope.filterName = 'Date';

        $scope.toggleParentDropDown = function ($event) {
            var dropClass = $($event.currentTarget.parentNode).hasClass('activeDropDown');
            if (dropClass) {
                $scope.parentDropDown = false;
            } else {
                $scope.parentDropDown = true;
            }
        };
        $scope.closeParentDropDown = function () {
            $scope.parentDropDown = false;
        };

        $scope.changedVal = categoriesMenuService.subItemOrder;
        var oldId = '';
        var oldToggleId = '';
        $scope.updateSubNavOpts = function(id, reverseOrder, type, name) {
            $scope.filterType = type;
            $scope.filterName = name;
            categoriesMenuService.subItemOrder.val = id;
            categoriesMenuService.subItemOrder.reverse = reverseOrder;
            $scope.changedVal = categoriesMenuService.subItemOrder;
            oldId = id;
            $scope.togglesDrop = !$scope.togglesDrop;
        }

        $scope.toggleMenuOpts = function(id) {
            if (oldToggleId == id) {
                $scope.togglesDrop = !$scope.togglesDrop;
            } else {
                $scope.toggles = id;
                $scope.togglesDrop = true;
            }
            oldToggleId = id;
        }
        $scope.closeDropDown = function(id) {
            if (oldToggleId == id) {
                $scope.togglesDrop = false;
            }
        }
    }
})();
