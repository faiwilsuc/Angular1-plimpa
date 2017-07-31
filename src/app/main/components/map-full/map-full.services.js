(function() {
    'use strict';

    angular
        .module('app.mapFull')
        .service('mapFullServices', function($window) {
            function updateMapHeight(elm) {
                elm.addClass("homeMapContainer");
                elm[0].style.height = ($window.innerHeight - 120) + "px";
                angular.element($window).resize(function() {
                    elm[0].style.height = ($window.innerHeight - 120) + "px";
                });
            }
            return {
                updateMapHeight: updateMapHeight
            }
        })


})();
