(function() {
    'use strict';

    angular
        .module('app.components')
        .controller('myAdsCtrl', function($scope,
            Auth,
            userService,
            utilsService,
            user,
            $state,
            itemsService,
            toastr,
            componentsService,
            userAuth
        ) {
            // Update scrollbar
            componentsService.updateScrollbar();

            $scope.UserAds = [];

            user.data = userAuth;
            $scope.user = user;

            // utilsService.getAuthUserName.async().then(function(data) {
            //     userService.getUserInfoByUsername.async(data.message).then(function(responseData) {
            //         user.data = responseData;
            //         console.log(user);
            //         $scope.user = user;
            //     })
            // });

            $scope.user = user;

            // $scope.$watch(function() {
            //     return user.active
            // }, function(newVal) {
            //     if (!newVal) {
            //         $state.go("home.login");
            //     };
            // });

            userService.getUserAdsActive.async().then(function(dataActive) {
                console.log(dataActive);
                for (var i = 0; i < dataActive.length; i++) {
                    dataActive[i].state = 1
                }
                $scope.UserAds = $scope.UserAds.concat(dataActive);
                userService.getUserAdsPending.async().then(function(dataPending) {
                    console.log(dataPending);
                    for (var i = 0; i < dataPending.length; i++) {
                        dataPending[i].state = 0;
                    }
                    $scope.UserAds = $scope.UserAds.concat(dataPending);

                    //Convert timestampts to readable format
                    for (var i = 0; i < $scope.UserAds.length; i++) {
                        var d = new Date($scope.UserAds[i].timestamp)
                        $scope.UserAds[i].timestampHuman = d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
                    }
                    console.log($scope.UserAds);
                    console.log("Count: " + $scope.UserAds.length);
                });
            });

            $scope.showItemInfo = function(item) {
                $state.go("home.item.info.open", {
                    id: item.category_id,
                    subId: item.subcategory_id,
                    itemInfo: _.snakeCase(item.itemTitle),
                    condoId: item.condoId,
                    itemId: item.itemId
                });
            };

            $scope.deleteItem = function(item) {
                console.log(item);
                switch (item.state) {
                    case 0:
                        itemsService.deleteItemPending.async(item.itemId).then(function() {
                            toastr.info("Posting Deleted");
                            $state.reload();
                        });
                        break;
                    case 1:
                        itemsService.deleteItemActive.async(item.itemId).then(function() {
                            toastr.info("Posting Deleted");
                            $state.reload();
                        });
                        break;
                }
            }
        })
})();
