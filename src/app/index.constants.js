/* global moment:false */
(function() {
    'use strict';

    angular
        .module('plimpaDev')
        .constant('mainUrl', '/api')
        .constant('postAddLoc', {
            title: ''
        })
        .constant('mapToggle', false)
        .constant('jsonGeoIpURL', 'https://freegeoip.net/json/')
        .constant('user', {})
        .constant('sideBarNav', {
            content: ""
        })
        .constant('mapSingleItem', {
            status: false,
            content: ''
        })
        .constant('s3options', {
            region: "us-west-2",
            bucket: "plimpa-bucket"
        })
        .constant('LOCALES', {
            locales: {
                th: 'ไทย',
                en: 'English'
            },
            preferredLocale: 'en'
        });
})();
