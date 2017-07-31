(function() {
    'use strict';

    angular
        .module('app.apps.postAdd.location', [])
        .controller('postAddLocationCtrl', function(
            $scope,
            $timeout,
            mainUrl,
            $http,
            utilsService,
            $document,
            mpService,
            choosePlace,
            postAddData,
            user,
            condoService,
            mapCons,
            $window,
            $rootScope
        ) {
            console.log("current user obj:")
            console.log(user)

            //in case if were not authenticated, come to `sell items - register` and authenticated. Need to be triggered back.
            $scope.AddItem.user_new = false;

            mapCons.IsChoosingLocation = true;

            // Full size
            postAddData.updateHeight();

            $scope.postAddInfo.title = "Location";

            //////////////////////////////////////////////////////
            //If location is passed from IW (for user without home location set)
            //////////////////////////////////////////////////////
            if (postAddData.hasOwnProperty("location") && postAddData.location.id_iw && !user.condo_id) {
                condoService.getCondoById.async(postAddData.location.id_iw).then(function(data) {
                    console.log(data)
                    $scope.AddItem.IsExistingLocation = true;
                    $scope.AddItem.location = data;
                    $scope.AddItem.location.condo_address_iw = data.title;
                    $scope.AddItem.location.location_type = data.locationType;
                });
            }

            $scope.AddItem.location = {}
            var stopWatchUser = $scope.$watch(function() {
                return user.data;
            }, function(newVal) {
                if (newVal) {
                    $scope.user = newVal;
                    console.info("user", newVal)
                    if (!$scope.AddItem.location.address && typeof newVal.condo_id != 'undefined') {
                        console.log(newVal)
                        condoService.getCondoById.async(newVal.condo_id).then(function(data) {
                            console.log(data)
                            $scope.AddItem.location = data;
                            if ($scope.AddItem.location.id) { $scope.AddItem.IsExistingLocation = true; }
                            stopWatchUser()
                        });
                    } else if (typeof $scope.user.condo_id == 'undefined') {
                        $scope.AddItem.IsExistingLocation = false;
                        $scope.AddItem.location = {};
                    }
                }
            }, true);

            $scope.AddItem.IsExistingLocation = false;
            $scope.$watch(function() {
                return postAddData.location.id; //because boolean value remains the same clicking on other condos.
            }, function(newValue) {
                console.log(newValue);
                $scope.IsProcessChoosingCondo = false;
                //console.log("id retuned: "+ locationId);
                if (newValue) {
                    $scope.showMap = false;
                    condoService.getCondoById.async(newValue).then(function(data) {
                        console.log("setting new location:")
                        console.log(data)
                        $scope.AddItem.IsExistingLocation = true;
                        $scope.AddItem.location = data;
                        $scope.AddItem.location.location_type = data.locationType;
                    });
                }
                if (!$scope.AddItem.location.id)
                    $scope.AddItem.IsExistingLocation = false;

            });
            $scope.$watch('AddItem.location.address', function(newValue) {
                if(newValue) {
                    $scope.showMap = false;
                }
            });


            $timeout(function() {
                $(".nano").nanoScroller();
            });


            $scope.markCondo = function() {
                mapCons.infowindow.close();

                $scope.AddItem.IsExistingLocation = false;
                $scope.AddItem.location = {};

                choosePlace.showDraggableMarker($scope);
                $scope.AddItem.location.condo_address_iw = "";
                postAddData.location.condo_address_iw = "";
                postAddData.location.location_type = "";
            };

            $scope.openMap = function() {
                $scope.showMap = true;
                $timeout($scope.markCondo);
            }

            $scope.condoType = [{
                name: "LOCATION.TYPE.CONDO",
                id: 'CONDO'
            }, {
                name: "LOCATION.TYPE.STATION",
                id: 'STATION'
            }, {
                name: "LOCATION.TYPE.MALL",
                id: 'MALL'
            }]
        });
})();
