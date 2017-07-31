(function() {
    'use strict';

    angular
        .module('app.itemInfo', [])
        .factory('preLoader', function() {
            return function(url, successCallback, errorCallback) {
                //Thank you Adriaan for this little snippet: http://www.bennadel.com/members/11887-adriaan.htm
                angular.element(new Image()).bind('load', function() {
                    successCallback();
                }).bind('error', function() {
                    errorCallback();
                }).attr('src', url);
            }
        })
        .directive('imageonload', ['preLoader', 'categoriesMenuService', '$timeout', function(preLoader, categoriesMenuService, $timeout) {
            return {
                restrict: 'A',
                terminal: true,
                priority: 100,
                link: function(scope, element, attrs) {
                    scope.default = attrs.defaultImage || "../../assets/img/loader.gif";
                    attrs.$observe('ngSrc', function() {
                        var url = attrs.ngSrc;
                        attrs.$set('src', scope.default);
                        preLoader(url, function() {
                            attrs.$set('src', url);
                            $timeout(function() {
                                $('.slideImages').each(function() {
                                    var vm = this;
                                    $(vm).magnificPopup({
                                        delegate: '.magnificImg',
                                        type: 'image',
                                        gallery: {
                                            enabled: true
                                        }
                                    });
                                });
                            }, 200);
                        }, function() {
                            if (attrs.fallbackImage != undefined) {
                                attrs.$set('src', attrs.fallbackImage);
                            }
                        });
                        element.bind('load', function() {
                            categoriesMenuService.updateHeight();
                        });
                        element.bind('error', function() {
                            categoriesMenuService.updateHeight();
                            element[0].src = '../../assets/img/default-image.svg';
                        });
                    })

                }
            };
        }])
        .controller('itemInfoCtrl', function(
            $scope,
            $stateParams,
            itemsService,
            ModalWindowService,
            $timeout,
            $window,
            mpService,
            mapCons,
            categoriesMenuService
        ) {
            // Update height
            categoriesMenuService.updateHeight();

            $scope.carouselProps = {
                interval: 5000,
                noWrapSlides: false,
                active: 0
            };

            itemsService.getItemInfo.async($stateParams.itemId).then(function(data) {
                $scope.itemVal = data;
                mpService.highlightIconAndOpenIW($scope.itemVal.itemId, $scope.itemVal.condoId, $scope);
                categoriesMenuService.updateHeight()
            });


            // Once map loading fineshes open item from the map
            $scope.$watch(function() {
                return mapCons.loadedFinished
            }, function(newVal, oldVal) {
                if (newVal !== oldVal) {
                    if (newVal) {
                        mpService.highlightIconAndOpenIW($scope.itemVal.itemId, $scope.itemVal.condoId, $scope);
                    };
                };
            });

            $scope.showOnMap = function() {
                $('a[aria-controls="tab_map"]').tab('show');
            }

        })
        .controller('itemInfoExternalCtrl', function(
          $scope,
          $state,
          itemsService,
          $timeout,
          $window,
          mpService,
          mapCons,
          categoriesMenuService
        ) {
          // Update height
          categoriesMenuService.updateHeight();
          $scope.itemVal = $state.params.obj;

        })
        .controller('itemInfoModalCtrl', function ($scope, $stateParams, mpService, $uibModalInstance, S3Service) {
          $scope.itemVal = $stateParams.obj;

          $scope.getImageUrls = function(condoId, itemId, imgName) {
            return S3Service.getS3ActiveImageUrl(condoId, itemId, imgName);
          };

          $scope.closeModal = function (result) {
            $uibModalInstance.close(result);
          };

          if ($scope.itemVal.itemId) {
            mpService.highlightIconAndOpenIW($scope.itemVal.itemId, $scope.itemVal.condoId, $scope);
          }
        })
})();
