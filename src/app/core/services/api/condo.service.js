/**
 *  Module
 *
 * Description
 */
(function() {
    "use strict"

    angular
        .module('app.core')
        .factory("condoService", function(mainUrl, $http) {
            var getAll = {
                async: function() {
                    var promise = $http.get(mainUrl + '/condo/all').then(function(response) {
                        return response.data;
                    });
                    return promise;
                }
            };

            var getCondoIdItems = {
                async: function(condoId) {
                    var promise = $http.get(mainUrl + '/condo/' + condoId + '/items').then(function(response) {
                        return response.data;
                    });
                    return promise;
                }
            };

            var getCondoById = {
                async: function(condoId) {
                    var promise = $http.get(mainUrl + '/condo/' + condoId).then(function(response) {
                        return response.data;
                    });
                    return promise;
                }
            };

            var getCondoName = {
                async: function(condoId) {
                    var promise = $http.get(mainUrl + '/condo/active/name/' + condoId).then(function(response) {
                        return response.data[0];
                    });
                    return promise;
                }
            };

            var addCondoPending = {
              async: function(condo) {

                var promise = $http({
                  method: 'POST',
                  url: mainUrl + '/condo/add_pending',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  data: condo
                }).then(function(response) {
                  return response.data;
                });

                return promise;
              }
            }

            return {
                getAll: getAll,
                getCondoById: getCondoById,
                getCondoIdItems: getCondoIdItems,
                getCondoName: getCondoName,
                addCondoPending:addCondoPending
            };
        });

})();
