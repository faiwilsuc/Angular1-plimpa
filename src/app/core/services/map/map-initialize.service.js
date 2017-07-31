(function() {
    "use strict"
    angular
        .module('app.core')
        .factory('mapInitilize', ["mapCons", "$timeout", function(mapCons, $timeout) {
            function initialize(data, secondData) {
                var latitude = mapCons.user_location.latitude;
                var longitude = mapCons.user_location.longitude;
                if (!navigator.geolocation) {
                    alert("Geolocation is not supported by your browser");
                } else {
                    navigator.geolocation.getCurrentPosition(function(position) {
                        latitude = position.coords.latitude;
                        longitude = position.coords.longitude;
                    });
                }

                var myLatlng = new google.maps.LatLng(latitude, longitude);
                var mapOptions = {
                    center: myLatlng,
                    zoom: 10,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    styles: [{ "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#e0e0e0" }, { "lightness": 0 }] }, { "featureType": "landscape", "elementType": "geometry.fill", "stylers": [{ "color": "#fafafa" }, { "lightness": 0 }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#eaeaff" }, { "lightness": 0 }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#eaeaff" }, { "lightness": 0 }, { "weight": 0.2 }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#eaeaff" }, { "lightness": 0 }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#eaeaff" }, { "lightness": 0 }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 0 }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#f2f2f2" }, { "lightness": 0 }] }, { "elementType": "labels.text.stroke", "stylers": [{ "visibility": "on" }, { "color": "#ffffff" }, { "lightness": 0 }] }, { "elementType": "labels.text.fill", "stylers": [{ "saturation": 36 }, { "color": "#212121" }, { "lightness": 0 }] }, { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#f4f4f4" }, { "lightness": 0 }] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#fefefe" }, { "lightness": 0 }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#fefefe" }, { "lightness": 0 }, { "weight": 1.2 }] }],

                    gestureHandling: 'cooperative'
                };

                if (secondData) {
                    mapCons.secondMap = new google.maps.Map(data, mapOptions);
                } else {
                    mapCons.map = new google.maps.Map(data, mapOptions);
                };
                var oldZoomLevel;
                mapCons.map.addListener('zoom_changed', function() {
                    var zoomLevel = mapCons.map.getZoom();
                    if (zoomLevel < mapOptions.zoom) {
                        $timeout(function() {
                            mapCons.map.panTo(mapCons.infowindow.getPosition());
                        });
                    };
                    oldZoomLevel = zoomLevel;
                });

            }

            return {
                initialize: initialize
            };
        }]);
})();
