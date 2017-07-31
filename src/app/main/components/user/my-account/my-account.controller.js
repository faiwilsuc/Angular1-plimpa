(function() {
    'use strict';

    angular
        .module('app.components')
        .controller('myAccountCtrl', function($scope, Auth, utilsService, user, userService, componentsService, userAuth) {
            user.data = userAuth;
            user.active = true;
            $scope.user = user.data;
            // utilsService.getAuthUserName.async().then(function(data) {
            //     // Update scrollbar
            //     componentsService.updateScrollbar();
            //     userService.getUserInfoByUsername.async(data.message).then(function(responseData) {
            //         console.log("I'm loading again")
            //         user.data = responseData;
            //         //because home.my_account is auth point for oauth2 auth
            //         user.active = true;
            //         $scope.user = user.data;
            //     })
            // });
        })
})();
