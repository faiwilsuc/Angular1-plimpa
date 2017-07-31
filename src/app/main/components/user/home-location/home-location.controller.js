(function() {
    'use strict';

    angular
        .module('app.components')
        .controller('homeLocationCtrl', function(
            $scope,
            utilsService,
            user,
            $state,
            $document,
            mapCons,
            mpService,
            condoService,
            $timeout,
            mapInitilize,
            postAddData,
            userService,
            componentsService,
            userAuth
        ) {
            // Update scrollbar
            componentsService.updateScrollbar();

            $scope.todayDate = moment().format("YYYYDDD");
            //Onload init:
            $scope.oldLocation = {};
            $scope.newLocation = {};

            user.data = userAuth;
            $scope.user = user.data;

            console.log(userAuth)

            if (!user.data.condo_id || user.data.condo_id == 0) {
                $scope.oldLocation.title = "Your current address has not been set"
            } else {
                condoService.getCondoById.async(user.data.condo_id).then(function(data) {
                    $scope.oldLocation = data;
                });
            }

            // utilsService.getAuthUserName.async().then(function(data_username) {
            //     userService.getUserInfoByUsername.async(data_username.message).then(function(data) {
            //         user.data = data;
            //         $scope.user = user.data;

            //         if (!user.data.condo_id || user.data.condo_id == 0) {
            //             $scope.oldLocation.title = "Your current address has not been set"
            //         } else {
            //             condoService.getCondoById.async(user.data.condo_id).then(function(data) {
            //                 $scope.oldLocation = data;
            //             });
            //         }
            //     });
            // });


            $scope.$watch(function() {
                return postAddData.location;
            }, function(newVal) {
                console.log(newVal)
                if (newVal) {
                    condoService.getCondoById.async(newVal.id).then(function(data) {
                        $scope.newLocation = data;
                    });
                };
            });

            $scope.$watch(function() {
                return postAddData.newCondo;
            }, function(newCondo) {
                if (newCondo) {
                    utilsService.getGeoCodeAddr.async(newCondo.latLng.lat, newCondo.latLng.lng).then(function(data) {
                        $scope.newLocationTitle = data;
                        $scope.addingCondoFromMap = true;
                    })
                };
            });


            $scope.toggleUpdateMap = function() {
                $scope.toggledMap = !$scope.toggledMap;
                $timeout(function() {
                    $scope.map = $document[0].getElementById("userMapChoose");
                    InitializeSearch($scope.map);
                    var secondData = true;
                    mapInitilize.initialize($scope.map, secondData);
                    var val = mapCons.mapStore;
                    mpService.showMarkers($scope, val, secondData);
                    $(".nano").nanoScroller({ alwaysVisible: true });
                }, 550);
                mapCons.IsChoosingLocation = true;
            };

            $scope.cancelUpdateMap = function() {
                $scope.toggledMap = false;
                $scope.addingCondoFromMap = false;
            };

            $scope.savePlaceUser = function() {
                $scope.toggledMap = false;
                $scope.addingCondoFromMap = false;
                userService.userUpdateLocation.async($scope.newLocation.id).then(function(data) {
                    $state.reload();
                })
            }
        })
})();
