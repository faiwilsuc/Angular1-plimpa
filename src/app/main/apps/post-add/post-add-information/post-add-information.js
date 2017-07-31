(function() {
    'use strict';

    angular
        .module('app.apps.postAdd.information', [])
        .controller('postAddInfoCtrl', function(
            $scope,
            Upload,
            mainUrl,
            itemsService,
            postAddData,
            user,
            $window,
            mapCons,
            $timeout,
            $document
        ) {

            //in case if were not authenticated, come to `sell items - register` and authenticated. Need to be triggered back.
            $scope.AddItem.user_new = false;

            // Full size
            $timeout(function() {
                postAddData.updateHeight();
            });

            $scope.postAddInfo.title = "Info";
            $scope.$watch(function() {
                return user
            }, function(val) {
                var userData = _.isEmpty(val.data);
                if (!userData) {
                    $scope.AddItem.email = val.data.email;
                };
            });

            $scope.getImageUrl = function(img) {
                itemsService.getImage.async(img).then(function(data) {
                    $scope.imgUrl = data;
                });
            };

            $scope.UploadLog = [];
            $scope.ProgressBar = '';
            $scope.images = [];
            postAddData.imgFilesData = [];
            $scope.onFileSelect = function($files) {

                $scope.imageIsLoading = true;
                $(".nano").nanoScroller();
                for (var i = 0; i < $files.length; i++) {
                    var $file = $files[i];

                    var data = {
                        file: $file,
                        filename: $file.name
                    }
                    Upload.upload({
                            url: mainUrl + '/items/upload_image',
                            data: data,
                            headers: {
                                'X-CSRF-TOKEN': $('input[name="_csrf"]').val(),
                                "Accept": "application/json;charset=utf-8"
                            }
                        })
                        .then(function(resp) {
                            $scope.imageIsLoading = false;
                            postAddData.imgFilesData.push(resp.config.data.filename);
                        }, function(resp) {
                            console.log('Error status: ' + resp.status);
                        }, function(evt) {
                            $scope.imageIsLoading = true;
                        });
                }
            };


            // Get categories list
            itemsService.getCategoriesList.async().then(function(data) {
                $scope.CategoriesList = data;
            });
            $scope.$watch("AddItem.category", function(newVal) {
                $scope.SubcategoriesList = "";
                if (typeof $scope.AddItem.category != 'undefined' && $scope.AddItem.category != null) {

                    itemsService.getSubcategoriesList.async(newVal).then(function(data) {
                        $scope.SubcategoriesList = data;
                    });
                }
            });

        });
})();
