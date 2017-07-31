/**
 *  Module
 *
 * Description
 */
(function() {
    "use strict"

    angular
        .module('app.core')
        .factory("repostService", function(mainUrl, $http, user) {

            var postToFacebook = {
                async: function(activeItemID, activeCondoId) {
                    var formData = {
                      "itemId": activeItemID,
                      "condoId" : activeCondoId,
                      "service": "facebook"
                    };

                    var promise = $http({
                        method: 'POST',
                        url: mainUrl + '/posting/facebook',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        data: formData
                    }).then(function(response) {
                        return response.data;
                    });

                    return promise;
                }
            }

            var postToCraigslist = {
              async: function(activeItemID, activeCondoId) {
                var formData = {
                  "itemId": activeItemID,
                  "condoId" : activeCondoId,
                  "service": "craigslist"
                };

                var promise = $http({
                  method: 'POST',
                  url: mainUrl + '/posting/craigslist',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  data: formData
                }).then(function(response) {
                  return response.data;
                });

                return promise;
              }
            }

            return {
              postToFacebook: postToFacebook,
              postToCraigslist: postToCraigslist
            };
        });

})();
