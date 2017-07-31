(function() {
    "use strict";

    /**
     *  Module
     *
     * Description
     */
    angular
        .module('app.core')
        .directive('infoWindow', function(
            $timeout,
            S3Service,
            toastr,
            itemsService,
            mapSingleItem,
            $window,
            postAddLoc,
            $state,
            $location,
            postAddData,
            condoService,
            $rootScope
        ) {
            // Runs during compile
            return {
                scope: {
                    iwdata: '=',
                    iwclose: '=',
                    iwlocation: '='
                },
                restrict: 'AE',
                templateUrl: function() {
                    if ($rootScope.IsMobileDevice()) {
                        return 'app/core/directives/map/info-window/info-window-mobile.html';
                    } else {
                        return 'app/core/directives/map/info-window/info-window.html';
                    }
                },
                link: function(scope, elm) {

                    $timeout(function() {
                        $('.magnificImages').each(function() {
                            $(this).magnificPopup({
                                delegate: '.magnificImgDel',
                                type: 'image',
                                gallery: {
                                    enabled: true
                                }
                            });
                        });
                    }, 1200);

                    // Getting english name
                    condoService.getCondoName.async(scope.iwlocation.title).then(function(data) {
                        scope.titleEng = data.title_en;
                    });

                    scope.$watch('iwdata', function() {
                        $timeout(function() {
                            $(".IWnano").nanoScroller();
                        }, 600);
                    })

                    scope.housingFilter = 6;

                    scope.getImageUrls = function(condoId, itemId, imgName) {
                        return S3Service.getS3ActiveImageUrl(condoId, itemId, imgName);
                    };
                    scope.getImageThumUrls = function(condoId, itemId, imgName) {
                        return S3Service.getS3ActiveImageThumbnailUrl(condoId, itemId, imgName);
                    }

                    scope.searchAround = function() {
                        var condo_list = [19];
                        var keyword = "''";
                        itemsService.searchAround.async(condo_list, keyword).then(function(data) {
                            toastr.info('Search around:' + data);
                        });
                    }

                    scope.goToSelectedUrl = function(data) {
                        toastr.info(data.title + ' is added');
                        if (!postAddData.hasOwnProperty("location")) {
                            postAddData.location = {};
                        }
                        postAddData.location.condo_address = "";
                        postAddData.location.condo_address_iw = data.title;
                        postAddData.location.id_iw = data.id;

                        console.log(postAddData.location);

                        if ($state.current.name == "home.post.location") {
                            $state.go("home.post.location");
                        } else {
                            $state.go("home.post");
                        };
                    }

                    scope.IsMobileDevice = $rootScope.IsMobileDevice;

                    scope.clickOnView = function(data) {
                        if($rootScope.IsMobileDevice()) {
                            $('a[aria-controls="tab_browser"]').tab('show');
                            $('a[aria-controls="tab_list"]').tab('show');
                        }
                        $state.go('home.item.info', data)
                    }

                }
            };
        });

})();
