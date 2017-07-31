(function() {
    'use strict';

    angular
        .module('plimpaDev')
        .constant('checkUser', {
            val: false
        })
        .run(runBlock);

    function runBlock(
        $rootScope,
        mapCons,
        condoService,
        utilsService,
        $window,
        MetaTags,
        tourFactory,
        localeService
    ) {
        $rootScope.MetaTags = MetaTags;

        condoService.getAll.async().then(function(data) {
            mapCons.mapStore = data;

            $rootScope.$emit('mapStore ready');
        });

        utilsService.getGeoIPJson.async().then(function (data) {
          mapCons.user_location.country_code = data.country_code;
          mapCons.user_location.city = data.city;
        });

        /**
         * @return {boolean}
         */
        $rootScope.IsMobileDevice = function() {
          return $window.innerWidth < 992;
        };

        $rootScope.IsFirstVisit = (function() {
          var check = false;
          if (! localStorage.noFirstVisit) {
            check = true;
            localStorage.noFirstVisit = "1";
          }
          return check;
        })();
        console.log("is first visit: "+ $rootScope.IsFirstVisit)

        if ($rootScope.IsFirstVisit) {
          tourFactory.run();
        }

        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            console.log("Current language: "+ localeService.getLocaleCode())

            if(
              toState.name.includes('home.post') ||
              toState.name.includes('home.item.info')
            ){
              $rootScope.isSingleStackedMenu = true;
            }
            else{
              $rootScope.isSingleStackedMenu = false;
            }
            // console.log("toState.name:"+toState.name+"  $rootScope.isSingleStackedMenu:"+ $rootScope.isSingleStackedMenu)
            $rootScope.isPostPage = toState.name.includes('home.post');
            $rootScope.isSearchPage = toState.name.includes('home.item.search');
            mapCons.IsChoosingLocation = false;
            if (mapCons.markerDraggableMarkLocation) mapCons.markerDraggableMarkLocation.setMap(null);
        });

    }

})();
