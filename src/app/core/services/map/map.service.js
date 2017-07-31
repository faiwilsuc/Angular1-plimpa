/**
 *  Module
 *
 * Description
 */
(function() {

    "use strict"

    angular
        .module('app.core')
        .constant('mapCons', {
            map: "",
            markers: "",
            infowindow: new google.maps.InfoWindow({
                position: new google.maps.LatLng(13.748074, 100.577436)
            }),
            iwLocationName: new google.maps.InfoWindow(),
            loadedFinished: false,
            mapStore: '',
            user_location: {
              city: '',
              country_code: '',
              latitude: 13.748074,
              longitude: 100.577436
            },
            IsChoosingLocation: false, //used to change the markers functionality
            markerDraggableMarkLocation: new google.maps.Marker(),
            cluster: {
                fn: "",
                option: [{
                        textColor: "#fafafa",
                        height: 25,
                        url: "../../assets/img/map/x1.png",
                        width: 25
                    }, {
                        textColor: "#fafafa",
                        height: 35,
                        url: "../../assets/img/map/x2.png",
                        width: 35
                    }, {
                        textColor: "#fafafa ",
                        height: 45,
                        url: "../../assets/img/map/x3.png",
                        width: 45
                    }
                    // , {
                    //     textColor: "#f8f8f8 ",
                    //     height: 66,
                    //     url: "../../assets/img/map/m3.png",
                    //     width: 65
                    // }
                    , {
                        textColor: "#ffffff",
                        height: 78,
                        url: "../../assets/img/map/m4.png",
                        // url: "../../assets/img/map/m3del.png",
                        width: 78
                    }, {
                        textColor: "#ffffff",
                        height: 90,
                        url: "../../assets/img/map/m6.png",
                        width: 90
                    }
                ],
                optionb: [{
                    textColor: "transparent",
                    height: 53,
                    url: "../../assets/img/map/mb3.png",
                    width: 53
                }, {
                    textColor: "transparent",
                    height: 56,
                    url: "../../assets/img/map/mb4.png",
                    width: 56
                }, {
                    textColor: "transparent",
                    height: 66,
                    url: "../../assets/img/map/mb3.png",
                    width: 66
                }, {
                    textColor: "transparent",
                    height: 78,
                    url: "../../assets/img/map/mb4.png",
                    width: 78
                }, {
                    textColor: "transparent",
                    height: 90,
                    url: "../../assets/img/map/mb6.png",
                    width: 90
                }]
            }
        })
        .factory('mpService', [
            'mapShowMarker',
            'mapInitilize',
            'mapShowItemPlace',
            'itemsService',
            'mapCons',
            function(
                mapShowMarker,
                mapInitilize,
                mapShowItemPlace,
                itemsService,
                mapCons
            ) {
                function initialize(data) {
                    mapInitilize.initialize(data);
                }
                var x = 0,
                    y = 0;

                function setCenter(xy) {
                    x = x + .001;
                    y = y + .001;
                    mapCons.map.panTo({
                        lat: mapCons.user_location.latitude + x,
                        lng: mapCons.user_location.longitude + y
                    });
                    if (!xy) {
                        xy = 10;
                    };
                    mapCons.map.setZoom(xy);
                }

                function showMarkers(scope, data, secondMap) {
                    mapShowMarker.showMarkers(scope, data, secondMap);
                }

                function highlightIconAndOpenIW(item_id, condo_id, scope) {
                    mapShowItemPlace.highlightIconAndOpenIW(item_id, condo_id, scope);
                }

                return {
                    initialize: initialize,
                    setCenter: setCenter,
                    showMarkers: showMarkers,
                    highlightIconAndOpenIW: highlightIconAndOpenIW
                };
            }
        ]);
})();
