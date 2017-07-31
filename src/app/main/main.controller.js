(function() {
    'use strict';

    angular
        .module('plimpaDev')
        .controller('plimpaDevCtrl', plimpaDevCtrl);

    /** @ngInject */
    function plimpaDevCtrl(
        $scope,
        S3Service,
        utilsService,
        mainUrl,
        user,
        uiTourService
    ) {
        $scope.emailValidationPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        $scope.mainUrl = mainUrl;
        $scope.getImageUrls = function(condoId, itemId, imgName) {
            return S3Service.getS3ActiveImageUrl(condoId, itemId, imgName);
        }
        $scope.getPendingImageUrls = function(condoId, itemId, imgName) {
            return S3Service.getS3PendingImageUrl(condoId, itemId, imgName);
        }
        $scope.getImageThumUrls = function(condoId, itemId, imgName) {
            return S3Service.getS3ActiveImageThumbnailUrl(condoId, itemId, imgName);
        }
        $scope.getImagePendingThumUrls = function(itemId, imgName) {
            return S3Service.getS3PendingImageThumbnailUrl(itemId, imgName);
        }

        $scope.logOut = function() {
            user = "";
            utilsService.logOut();
        };
    }
})();
