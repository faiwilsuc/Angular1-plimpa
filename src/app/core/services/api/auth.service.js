/**
 *  Module
 *
 * Description
 */
(function() {
    "use strict"

    angular
        .module('app.core')
        .factory("Auth", function(mainUrl, $http) {

            var login = {
                async: function(user) {
                    var promise = $http({
                        url: mainUrl + "/authentication",
                        method: "POST",
                        data: $.param(user),
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                                // 'Content-Type': 'application/json'
                        }
                    }).then(function(response) {
                        console.log(response);
                        return response.data;
                    });
                    return promise;
                }
            };

            var checkUser = {
                async: function(user) {
                    var promise = $http.get(mainUrl + '/user/' + user).then(function(response) {
                        return response.data;
                    });
                    return promise;
                }
            };

            return {
                login: login,
                checkUser: checkUser
            };
        });

})();
