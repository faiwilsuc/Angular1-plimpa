(function() {
    "use strict";

    /**
     *  Module
     *
     * Description
     */
    angular
        .module('app.core')
        .directive('infoWindowHover', function() {
            // Runs during compile
            return {
                scope: {
                    title: '@'
                },
                restrict: 'AE',
                templateUrl: 'app/core/directives/map/info-window/info-window-hover.html',
                link: function(scope) {}
            };
        });

})();
