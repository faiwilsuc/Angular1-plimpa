(function() {
    'use strict';

    angular
        .module('app.pages.auth.register')
        .controller('RegisterController', RegisterController);

    function RegisterController(
        $scope,
        userService,
        utilsService,
        toastr,
        $timeout,
        $state
    ) {

        $timeout(function() {
            $(".authContainerRegister").nanoScroller();
        });

        //check pass confimation
        $scope.registerUser = {};
        $scope.PassIncorrect = true;
        $scope.$watchCollection("registerUser", function(newVal, oldVal) {
            if (newVal != oldVal) {
                $(".authContainerRegister").nanoScroller();
                if ($scope.registerUser.password != $scope.registerUser.confirm_password) {
                    $scope.PassIncorrect = false;
                } else {
                    $scope.PassIncorrect = true;
                }
            };
        });

        $scope.userIsCreating = false;
        $scope.authIsLoading = false;
        $scope.onRegister = function(credentials) {
            $scope.authIsLoading = true;
            userService.register.async($scope.registerUser).then(function(data) {
                $scope.userIsCreating = true;
                if (data.status == "FAIL" && data.message === "duplicate") {
                    $scope.ErrorUserExists = true;
                } else if (data.status == "FAIL" && data.message !== "duplicate") {
                    $scope.ResponseHasError = true;
                } else {
                    toastr.success('Congratulations! You have successfully registered.');
                    $scope.ResponseSuccess = true;
                    $timeout(function() {
                        $state.go("home.login");
                    }, 4000);
                }
                $scope.authIsLoading = false;
            });
        };

        $scope.userSearching = false;
        $scope.checkUsername = function(username) {
            $scope.userSearching = true;
            utilsService.checkLogin.async(username).then(function(data) {
                $scope.userSearching = false;
                $scope.IsUserExist = data;
                if (!data) {
                    $scope.IsUserNoExist = true;
                } else {
                    $scope.IsUserNoExist = false;
                };
            });
        }

        $scope.emailSearching = false;
        $scope.checkEmail = function(email) {
            $scope.emailSearching = true;
            utilsService.checkEmail.async(email).then(function(data) {
                $scope.emailSearching = false;
                $scope.IsEmailExist = data;
                if (!data) {
                    $scope.IsEmailNoExist = true;
                } else {
                    $scope.IsEmailNoExist = false;
                };
            });
        }
    };

})();
