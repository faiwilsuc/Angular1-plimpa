/* global moment:false */
(function() {
    'use strict';

    angular
        .module('app.pages.blog.single', [])
        .controller('blogPostCtrl', function($scope, $document, $stateParams, blogService) {


            blogService.getById.async($stateParams.id).then(function(data) {
                console.log(data)
                $scope.post = data;
            });

            var someElement = angular.element(document.getElementById('topBlog'));
            $document.scrollToElement(someElement, 30, 800);
        });

})();
