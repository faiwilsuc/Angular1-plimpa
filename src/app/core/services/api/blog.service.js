/**
 *  Module
 *
 * Description
 */
(function() {
  "use strict"

  angular
    .module('app.core')
    .factory("blogService", function(mainUrl, $http, user) {
      var getAll = {
        async: function() {
          var promise = $http.get(mainUrl + '/v2/blog/').then(function(response) {
            return response.data;
          });
          return promise;
        }
      };

      var getById = {
        async: function(id) {
          var promise = $http.get(mainUrl + '/v2/blog/'+id).then(function(response) {
            return response.data;
          });
          return promise;
        }
      };

      return {
        getAll: getAll,
        getById: getById
      };
    });

})();
