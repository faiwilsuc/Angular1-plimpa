/**
 *  Module
 *
 * Description
 */


(function() {
    'use strict';

    angular.module('app.footer')
        .directive('mainFooter', function() {
            // Runs during compile
            return {
                scope: {},
                restrict: 'AE',
                templateUrl: 'app/main/components/footer/footer.html',
                link: function(scope) {

                }
            };
        });

})();
