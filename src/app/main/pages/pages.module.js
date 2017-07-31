(function() {
    'use strict';

    angular
        .module('app.pages', [
            'app.pages.auth',
            'app.pages.home',
            'app.pages.catalog',
            'app.pages.blog',
            'app.pages.blog.single',
            'app.pages.directory'
        ])
        .config(config);

    /** @ngInject */
    function config() {

    }
})();
