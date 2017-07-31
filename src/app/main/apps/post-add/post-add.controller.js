(function() {
    'use strict';

    angular
        .module('app.apps.postAdd')
        .constant('responseWait', {
            status: false
        })
        .directive('scrollBottom', function($rootScope) {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {
                    var raw = element[0];
                    element.bind('scroll', function() {
                        if (raw.scrollTop + raw.offsetHeight > raw.scrollHeight) {
                            $rootScope.scrolledBottom = true;
                            scope.$apply(attrs.scrolly);
                        } else {
                            $rootScope.scrolledBottom = false;
                            scope.$apply(attrs.scrolly);
                        }
                    });
                }
            };
        })
        .service('postAddData', function($window) {
            var value = [];

            function updateHeight() {
                var postAddContainer = $(".postAddContainer");
                postAddContainer[0].style.height = ($window.innerHeight - 120) + "px";
                $(".nano").nanoScroller({ alwaysVisible: true });
                angular.element($window).resize(function() {
                    postAddContainer[0].style.height = ($window.innerHeight - 120) + "px";
                    $(".nano").nanoScroller({ alwaysVisible: true });
                });
            }

            function re_initialize() {
                for (var prop in self) {
                    if (self.hasOwnProperty(prop)) { delete self[prop]; }
                }
            }

            return {
                re_initialize: re_initialize,
                value: value,
                updateHeight: updateHeight
            }
        })
        .controller('postAddController', postAddController);

    function postAddController(
        $scope,
        $timeout,
        $state,
        postAddData,
        toastr,
        $location,
        user,
        itemsService,
        userService,
        repostService,
        utilsService,
        responseWait
    ) {
        // Get username for checking
        console.log(user);
        // utilsService.getAuthUserName.async().then(function(data) {
        //     userService.getUserInfoByUsername.async(data.message).then(function(responseData) {
        //         user.data = responseData;
        //         $scope.user = user;
        //     })
        // });

        // Scroll center
        $scope.scrollCenter = function(elmId) {
            var someElement = angular.element(document.getElementById("postAddContainerFormInsider"));
            someElement[0].scrollTop = someElement[0].scrollTop + 45;
        }

        // Watching respone wait
        $scope.$watch(function() {
            return responseWait;
        }, function(newVal) {
            $scope.responseWait = newVal.status;
        }, true);

        // Full size
        $timeout(function() {
            postAddData.updateHeight();
        });

        $scope.AddItem = postAddData;
        $scope.registerUser = {};
        $scope.postAddInfo = {
            title: '',
            pages: [{
                title: "Info",
                sref: "home.post.info"
            }, {
                title: "Location",
                sref: "home.post.location"
            }, {
                title: "Location",
                sref: "home.post.location"
            }, {
                title: "Social",
                sref: "home.post.social"
            }, {
                title: "Register",
                sref: "home.post.register"
            }]
        }

        $scope.$watch(function() {
            return user.active
        }, function(newVal) {
            if (newVal) {
                var index = _.findIndex($scope.postAddInfo.pages, { 'title': 'Register' });
                $scope.postAddInfo.pages.splice(index, 1);
            }
        });

        $scope.sendPostErrorInfo = function() {
            responseWait.status = true;
            utilsService.sendPostAdErrorReport.async($scope.AddItem.postErrorData).then(function() {
                responseWait.status = false;
                alert("Thank you for your cooperation!");
                $state.go('home');
            })
        }

        $scope.submitForm = function() {
            //TODO SPINNER START
            console.log($scope.registerUser);

            responseWait.status = true;
            // Set data for `item`
            var postdata = $scope.AddItem;
            var item = {
                itemTitle: postdata.title,
                itemDescr: postdata.descr,
                itemPrice: postdata.price,
                itemPhone: postdata.phone,
                itemImages: postAddData.imgFilesData,
                itemEmail: postdata.email,
                category_id: postdata.category,
                subcategory_id: postdata.subcategory
            };
            if (postdata.IsExistingLocation) { item.condoId = postdata.location.id; }

            // Set data for `condo`
            var condo = {};
            condo.id = postdata.location.id;
            condo.title = postdata.location.title;
            condo.address = postdata.location.address;
            condo.latitude = postdata.location.latitude;
            condo.longtitude = postdata.location.longtitude;
            condo.locationType = postdata.location.location_type;

            // Set data for `user_registered`
            var IsRegisteredUser = false;
            if (user.active) {
                IsRegisteredUser = true;
            };

            // Set data for `repost`
            var repost_to = [];
            if (postdata.socialRepost.facebook) {
                repost_to.push("fb");
            }
            if (postdata.socialRepost.craigslist) {
                repost_to.push("cl");
            }

            var generatedData = {
                item: item,
                condo: condo,
                condo_exist: postdata.IsExistingLocation,
                user_registered: IsRegisteredUser,
                repost_to: repost_to
            }

            if (postdata.user_new) {
                generatedData.user_new = $scope.registerUser.username;
                var registerData = {
                    username: $scope.registerUser.username,
                    email: $scope.registerUser.email,
                    password: $scope.registerUser.password
                }
                userService.register.async(registerData).then(function(data) {
                    sendFinalPost(JSON.stringify(generatedData));
                });
            } else {
                sendFinalPost(JSON.stringify(generatedData));
            };

        };

        function sendFinalPost(generatedData) {
            itemsService
                .postAdd
                .async(generatedData).then(function(data) {
                    generatedData = JSON.parse(generatedData);
                    responseWait.status = false;

                    if (data.status == "FAIL") {
                        parsePostError(data, generatedData);
                    } else {
                        //////////
                        ///Social
                        /////////////
                        var createdItemID = null;
                        if (data.status == "created_id") { createdItemID = data.message; }
                        var activeCondoId = generatedData.condo.id;
                        //TODO HERE is condo ID of the registered user.
                        //TODO If it is empty (user mark on map non-existing condo, all Scenarios with non-existing condo),
                        //TODO Will not send repost right after posting ad (ad waiting for manual approval)

                        // console.log("repost data: ")
                        // console.log(generatedData.condo.id)
                        // console.log(createdItemID)
                        // console.log(generatedData.repost_to)
                        // console.log(generatedData.repost_to.length)
                        if (generatedData.condo.id && createdItemID && generatedData.repost_to && generatedData.repost_to.length > 0) {
                            for (var i = 0; i < generatedData.repost_to.length; i++) {
                                switch (generatedData.repost_to[i]) {
                                    case "fb":
                                        $timeout(function() {
                                            repostService.postToFacebook.async(createdItemID, activeCondoId);
                                        }, 10000);
                                        break;
                                    case "cl":
                                        $timeout(function() {
                                            repostService.postToCraigslist.async(createdItemID, activeCondoId);
                                        }, 10000);
                                        break;
                                }
                                //TODO NOTE have to wait 10 seconds before making the request, because there must be some time to transfer items images to S3.
                                //TODO NOTE however, "Post success" can be shown before this repost requests are done
                            }
                        } //flag is item posted through tempItem
                        $scope.AddItem = {}
                        toastr.success('Congratulations! Your item successfully posted.');
                        $state.go('home.post.complete_success');
                    }
                }).catch(function(data) {
                    parsePostError(data, generatedData);
                });
        }

        function parsePostError(errorFullData, requestData) {
            requestData = JSON.parse(requestData);
            $scope.IsFormSubmitting = false;
            $scope.AddItem.postErrorData = {
                errorTitle: errorFullData.data.exception,
                errorData: JSON.stringify(errorFullData.data.message),
                requestData: requestData,
                userEmail: requestData.item.itemEmail
            };

            toastr.error('Some error happened :( ');
            $state.go('home.post.complete_error');
        }
    }
})();
