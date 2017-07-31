(function() {
    'use strict';

    angular
        .module('app.mapFull')
        .directive('fullMap', [
            "$document",
            "mpService",
            "mapCons",
            "responseWait",
            "mapFullServices",
            "$rootScope",
            function(
                $document,
                mpService,
                mapCons,
                responseWait,
                mapFullServices,
                $rootScope
            ) {
                return {
                    scope: {},
                    restrict: 'E',
                    transclude: "true",
                    templateUrl: 'app/main/components/map-full/map-full.html',
                    link: function mapFullCtrl($scope, elm) {

                        // Wait and show the preloader if map is clicked, dragged
                        $scope.$watch(function() {
                            return responseWait;
                        }, function(newVal) {
                            $scope.responseWait = newVal.status;
                        }, true);

                        // Update height of the map
                        mapFullServices.updateMapHeight(elm);

                        // Check all codos loaded and show the condos in the map
                        $scope.$watch(function() {
                            return mapCons.mapStore;
                        }, function(val) {
                            if (val) {
                                $scope.markersPutted = true;
                                mpService.showMarkers($scope, val);
                            } else {
                                $scope.markersPutted = false;
                            };
                        });

                        // Initialize the map
                        $scope.map = $document[0].getElementById("indexmap");
                        mpService.initialize($scope.map);
                    }
                };
            }
        ]);
})();
