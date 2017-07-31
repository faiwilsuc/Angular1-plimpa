(function() {
    'use strict';

    angular
        .module('plimpaDev')
        .config(['$httpProvider', function($httpProvider) {
            $httpProvider.interceptors.push('responseErrorHandler');
        }])
        .config(function($logProvider){
          $logProvider.debugEnabled(false);
        })

         // Angular Translate
        .config(function ($translateProvider) {
          // if (DEBUG_MODE) {
            $translateProvider.useMissingTranslationHandlerLog();// warns about missing translates
          // }

          $translateProvider.useStaticFilesLoader({
            prefix: 'app/languages/locale-',
            suffix: '.json'
          });

          var langMap = {
            'en_AU': 'en',
            'en_CA': 'en',
            'en_NZ': 'en',
            'en_PH': 'en',
            'en_UK': 'en',
            'en_US': 'en',
            'th_TH': 'th',
            '*': 'en'
          };

          $translateProvider
            .useLocalStorage()
            .registerAvailableLanguageKeys(['en', 'th'], langMap)
            .determinePreferredLanguage()
            .fallbackLanguage(['en']);
        })
        // Angular Dynamic Locale
        .config(function (tmhDynamicLocaleProvider) {
          tmhDynamicLocaleProvider.localeLocationPattern('bower_components/angular-i18n/angular-locale_{{locale}}.js');
        })
        .config(['UIRouterMetatagsProvider', configureMeta]);

        function configureMeta(UIRouterMetatagsProvider) {
          var keywords_array = ["Classified", "Ads", "advertisements", "buy sell", "buy/sell", "sell stuff", "online marketplace", "sell clothes", "buy clothes", "buy laptop", "sell laptop", "individual ads", "Thailand Classifieds", "Thailand sell stuff", "buy sell Thailand"];
          var keywords = '';
          for(var i=0;i<keywords_array.length;i++){
            if (keywords === '') {
              keywords += keywords_array[i];
            } else {
              keywords += ', ' + keywords_array[i];
            }
          }

          UIRouterMetatagsProvider
            // .setTitlePrefix('prefix - ')
            .setTitleSuffix(' | Plimpa')
            .setDefaultTitle('Plimpa - Free Local Classifieds Ads across South East Asia')
            .setDefaultDescription('Plimpa is a location-based classifieds that will help you buy, sell & trade with communities around you. Find local sellers with anything from homes, cars, furniture or a flatmate')
            .setDefaultKeywords(keywords)
            // .setStaticProperties({
            //   'fb:app_id': 'your fb app id',
            //   'og:site_name': 'your site name'
            // })
            .setOGURL(true);
        }
})();
