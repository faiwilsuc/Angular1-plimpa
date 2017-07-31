(function() {
    'use strict';

    angular
        .module('app.components')
        .service('itemsAround', function($window, $rootScope, mapCons, itemsService, utilsService, $timeout) {

          function findItemsAround(centerLatLng, distanceLimit){
            return new Promise(function(resolve, reject) {
              if (mapCons.mapStore) {
                resolve(_findItemsAroundMain(centerLatLng, distanceLimit))
              }
              else {
                $rootScope.$on('mapStore ready', function () {
                  resolve(_findItemsAroundMain(centerLatLng, distanceLimit))
                });
              }
            });
          }

          function _findItemsAroundMain(centerLatLng, distanceLimit) {
            var parsedMarkers = _findCloseMarkers(centerLatLng, distanceLimit);
            var condo_search_list = [];
            for (var i =0; i<parsedMarkers.length;i++){
              condo_search_list.push(parsedMarkers[i].id);
            }
            return itemsService.searchByCondoList.async(condo_search_list).then(function(data){
              return data;
            });
          }

          // find close condo from centerLatLng by distanceLimit
          function _findCloseMarkers(centerLatLng, distanceLimit) {
              var parsedMarkers = [];
              for (var i = 0; i < mapCons.mapStore.length; i++)
              {
                var distance = google.maps.geometry.spherical.computeDistanceBetween(centerLatLng, new google.maps.LatLng(mapCons.mapStore[i].latitude, mapCons.mapStore[i].longtitude));
                if(distance < distanceLimit){
                  parsedMarkers.push(mapCons.mapStore[i]);
                }
              }
              return parsedMarkers;
          }


          function determineSearchCenter() {
              return _getLocationFromBrowser().then(function (data) {
                  if(!data) {
                    console.log('unable to get location from browser')
                    return _getCountryAndCityByIP().then(function (data) {
                      return data;
                    });
                  }
                  else return data;
              });
          }

          // http://stackoverflow.com/questions/5947637/function-fail-never-called-if-user-declines-to-share-geolocation-in-firefox
          // I hope you can find a better solution for mozilla
          function _getLocationFromBrowser(){
            return new Promise(function(resolve, reject) {
              if (navigator.geolocation) {
                var LatLng;
                navigator.geolocation.getCurrentPosition(function(position) {
                  console.log('get location from browser')
                  LatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                }, function(error) {}, {timeout:2000});
                $timeout(function () {
                  resolve(LatLng)
                }, 1000)
              }
            });
          }

          function _getCountryAndCityByIP(){
              return utilsService.getGeoIPJson.async().then(function (data) {
                  return {
                    country: data.country_code,
                    city: data.city
                  };
              });
          }

          return {
              findItemsAround: findItemsAround,
              determineSearchCenter: determineSearchCenter,
          }
        });
})();
