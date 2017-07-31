(function() {
    'use strict';

    angular
        .module('app.pages.auth.login')
        .controller('LoginController', LoginController);


    function LoginController(utilsService, checkUser, $scope, $http, $window, Auth, toastr, $timeout, $state, user) {

        $scope.credentials = {
            username: "",
            password: ""
        };

        $scope.startChecking = false;

        $scope.onLogin = function(credentials) {

            $scope.startChecking = true;
            Auth.login.async(credentials).then(function(data) {
                $timeout(function() {
                    $scope.startChecking = false;

                }, 800);
                if (data.authenticated == true) {
                    toastr.success('Redirecting home page', 'Logged in');
                    console.log(checkUser)
                    checkUser = true;
                    $timeout(function() {
                        user.active = true;
                        $state.go('home.my_account');
                    }, 300);
                } else if (data.message != null) {
                    toastr.error(data.message, 'Error');
                    $scope.LoginError = data.message;
                    $scope.ResponseHasError = true;
                } else if (data.errorMessage != null) {
                    toastr.error(data.errorMessage, 'Info');
                    $scope.LoginError = data.errorMessage;
                    $scope.ResponseHasError = true;
                }
            });
        };
    };

})();
