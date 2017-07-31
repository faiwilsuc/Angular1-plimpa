/**
 *  Module
 *
 * Description
 */
(function() {
    "use strict"

    /*global Google */

    angular
        .module('app.apps.choosePlace', [])
        .factory('choosePlace', [
            "mapCons",

            "mpService",
            "$document",
            "$timeout",
            "$state",
            "postAddData",
            "utilsService",
            "$compile",
            "condoService",
            "responseWait",
            function(
                mapCons,

                mpService,
                $document,
                $timeout,
                $state,
                postAddData,
                utilsService,
                $compile,
                condoService,
                responseWait
            ) {
                function showDraggableMarker(scope) {
                    if (mapCons.markerDraggableMarkLocation) mapCons.markerDraggableMarkLocation.setMap(null);

                    var MarkerImage = 'data:image/svg+xml,%3Csvg%20width%3D%2235pt%22%20height%3D%2245pt%22%20viewBox%3D%220%200%2050%2060%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill%3D%22transparent%22%20d%3D%22%20M%200.00%200.00%20L%2050.00%200.00%20L%2050.00%2060.00%20L%2025.23%2060.00%20C%2031.37%2052.08%2037.05%2043.76%2041.75%2034.89%20C%2043.88%2030.54%2046.32%2025.96%2045.94%2020.95%20C%2046.09%2013.80%2042.21%206.49%2035.66%203.33%20C%2029.07%200.17%2020.97%200.16%2014.39%203.36%20C%205.49%207.77%201.76%2019.57%205.50%2028.56%20C%208.87%2037.23%2014.19%2044.96%2019.48%2052.55%20C%2021.11%2055.01%2023.28%2057.18%2024.31%2060.00%20L%200.00%2060.00%20L%200.00%200.00%20Z%22%20%2F%3E%0A%3Cpath%20fill%3D%22%23689f38%22%20d%3D%22%20M%2014.39%203.36%20C%2020.97%200.16%2029.07%200.17%2035.66%203.33%20C%2042.21%206.49%2046.09%2013.80%2045.94%2020.95%20C%2046.32%2025.96%2043.88%2030.54%2041.75%2034.89%20C%2037.05%2043.76%2031.37%2052.08%2025.23%2060.00%20L%2024.31%2060.00%20C%2023.28%2057.18%2021.11%2055.01%2019.48%2052.55%20C%2014.19%2044.96%208.87%2037.23%205.50%2028.56%20C%201.76%2019.57%205.49%207.77%2014.39%203.36%20Z%22%20%2F%3E%0A%3Cpath%20fill%3D%22%23689f38%22%20d%3D%22%20M%2020.45%208.58%20C%2027.60%206.30%2035.95%2010.65%2038.21%2017.79%20C%2040.94%2025.05%2036.60%2033.87%2029.22%2036.21%20C%2021.97%2038.94%2013.14%2034.61%2010.81%2027.25%20C%207.94%2019.74%2012.71%2010.62%2020.45%208.58%20Z%22%20%2F%3E%0A%3Ctext%20transform%3D%22translate(19%2018.5)%22%20fill%3D%22%23212121%22%20x%3D%225%22%20y%3D%228%22%20font-size%3D%2213%22%20font-weight%3D%22bold%22%20font-family%3D%22sans-serif%22%20text-anchor%3D%22middle%22%3E' + '' + '%3C%2Ftext%3E%0A%3C%2Fsvg%3E'
                    mapCons.markerDraggableMarkLocation = new google.maps.Marker({
                        map: mapCons.map,
                        draggable: true,
                        icon: {
                            // url: '../../assets/img/drag.png',
                            url: MarkerImage,
                            labelOrigin: new google.maps.Point(20, 20)
                        },
                        position: mapCons.map.getCenter()
                    });
                    mapCons.markerDraggableMarkLocation.setZIndex(100)


                    google.maps.event.addListener(mapCons.markerDraggableMarkLocation, 'dragend', function(mouseEvent) {
                        console.log(mouseEvent);
                        var lat = mouseEvent.latLng.lat();
                        var lng = mouseEvent.latLng.lng();
                        responseWait.status = true;
                        utilsService.getGeoCodeAddr.async(lat, lng).then(function(data) {
                            responseWait.status = false;
                            postAddData.location.address = data;
                            postAddData.location.latitude = lat;
                            postAddData.location.longtitude = lng;
                        });
                        postAddData.location.condoAddrSelected = true;
                        postAddData.location.id = "";

                        scope.AddItem.location = postAddData.location;

                        console.log(scope.postAdd_form.$error)
                    });

                    google.maps.event.addListener(mapCons.markerDraggableMarkLocation, 'click', function(mouseEvent) {
                        var lat = mouseEvent.latLng.lat();
                        var lng = mouseEvent.latLng.lng();
                        responseWait.status = true;
                        utilsService.getGeoCodeAddr.async(lat, lng).then(function(data) {
                            responseWait.status = false;
                            postAddData.location.address = data;
                            postAddData.location.latitude = lat;
                            postAddData.location.longtitude = lng;
                        });
                        postAddData.location.condoAddrSelected = true;
                        postAddData.location.id = "";

                        scope.AddItem.location = postAddData.location;
                    });
                }



                return {
                    showDraggableMarker: showDraggableMarker
                };
            }
        ]);
})();
