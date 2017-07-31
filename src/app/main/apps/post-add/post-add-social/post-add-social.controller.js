(function() {
    'use strict';

    angular
        .module('app.apps.postAdd.social', [])
        .controller('pastAddSocialCtrl', function(
            $scope,
            $timeout,
            navAd,
            $http,
            Upload,
            $window,
            S3Service,
            mainUrl,
            postAddLoc,
            $rootScope,
            $cookies,
            postAddData,
            $location,
            $fb,
            user,
            utilsService
        ) {


            // Full size
            postAddData.updateHeight();
            $scope.AddItem.socialRepost = {};

            $scope.postAddInfo.title = "Social";
            $scope.$watch(function() {
                return user
            }, function(newVal) {
                // console.log(user)
                $scope.userActive = newVal;
            });

            $scope.user = user;
        })

})();
