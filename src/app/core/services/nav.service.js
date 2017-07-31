/**
 *  Module
 *
 * Description
 */
(function() {
    "use strict"

    /*global Google */

    angular
        .module('app.core')
        .factory("navAd", function() {
            var toggleVal = false;
            return {
                toggled: toggleVal
            };
        });

})();
