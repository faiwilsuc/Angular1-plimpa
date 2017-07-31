/* global moment:false */
(function() {
    'use strict';

    angular
        .module('app.pages.blog', [])
        .controller('blogCtrl', function($scope, $document, $stateParams, $timeout, blogService) {
            $scope.postsAll = [];

            $timeout(function () {
                blogService.getAll.async().then(function (data) {
                  $scope.postsAll = data;
                  console.log(data)
                })
            });

            var someElement = angular.element(document.getElementById('topBlog'));
            $document.scrollToElement(someElement, 30, 800);
        });

})();
