(function() {
    "use strict";

    /**
     *  Module
     *
     * Description
     */
    angular
        .module('app.core')
        .directive('ngTranslateLanguageSelect', function(localeService) {

            return {
                restrict: 'A',
                replace: true,
                templateUrl: 'app/core/directives/languageSelect/languageSelect.html',
                controller: function($scope) {
                    $scope.currentLocaleDisplayName = localeService.getLocaleDisplayName();
                    $scope.localesDisplayNames = localeService.getLocalesDisplayNames();
                    $scope.visible = $scope.localesDisplayNames &&
                        $scope.localesDisplayNames.length > 1;

                    $scope.changeLanguage = function(locale) {
                        localeService.setLocaleByDisplayName(locale);
                        $scope.showLngDrop = false;
                        if (locale == 'English') {
                            $scope.lngVal.active = 'en';
                        } else {
                            $scope.lngVal.active = 'thai';
                        };
                    };
                }
            };

        });

})();
