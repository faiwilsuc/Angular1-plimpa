(function() {
    'use strict';

    angular
        .module('app.apps.postAdd.register', [])
        .controller('postAddRegisterCtrl', function(
            $scope,
            Upload,
            mainUrl,
            itemsService,
            postAddData,
            user,
            utilsService,
            $window,
            $timeout
        ) {
            // Full size
            postAddData.updateHeight();

            $scope.postAddInfo.title = "Register";

            $scope.AddItem.user_new = true;

            $scope.registerUser.email = $scope.AddItem.email;


            //check pass confimation
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
            $timeout(function() {
                $scope.checkEmail($scope.registerUser.email);
            });

        })
})();
