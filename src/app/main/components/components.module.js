(function() {
    'use strict';

    angular
        .module('app.components', [
            'app.stackedMenu',
            'app.mapFull',
            'app.footer',
            'app.subCategories',
            'app.subCategoriesItem',
            'app.itemInfo'
        ])
        .service('componentsService', function($window) {

            function updateScrollbar() {
                $(".nano").nanoScroller({ alwaysVisible: true });
                angular.element($window).resize(function() {
                    $(".nano").nanoScroller({ alwaysVisible: true });
                });
            }

            return {
                updateScrollbar: updateScrollbar
            }
        })
        .config(config);

    /** @ngInject */
    function config() {}
})();
