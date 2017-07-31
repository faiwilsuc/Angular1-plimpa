/**
 *  Module
 *
 * Description
 */
(function() {
    "use strict"

    angular
        .module('app.core')
        .factory("userService", function(mainUrl, $http, user) {


            var register = {
                async: function(registration_data) {
                    var roles = [];
                    roles.push("ROLE_USER");

                    // Default values for the request.
                    var formData = {
                        "username": registration_data.username,
                        "email": registration_data.email,
                        "password": registration_data.password,
                        "roles": roles,
                        "enabled": true,
                        "provider": "local"
                    };

                    var promise = $http({
                        url: mainUrl + "/register",
                        method: "POST",
                        // data: $.param(formData),
                        data: formData,
                        headers: {
                            'Content-Type': 'application/json'
                                // 'Content-Type': 'application/json'
                        }
                    }).then(function(response) {
                        return response.data;
                    });
                    return promise;
                }
            };

            var userUpdateLocation = {
                async: function(new_location_id) {

                    var promise = $http({
                        url: mainUrl + "/user/update_location",
                        method: "POST",
                        data: {
                            condo_id: new_location_id,
                            datetime_condo_changed: moment(),
                            email: user.data.email,
                            enabled: user.data.enabled,
                            id: user.data.id,
                            // password: user.password,
                            // password: "demo",
                            // provider: user.provider,
                            roles: user.data.roles,
                            username: user.data.username
                        },
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(function(response) {
                        return response.data;
                    });

                    return promise;
                }
            };

            var getUserAdsActive = {
              async: function() {
                var promise = $http.get(mainUrl + '/user/ads/active').then(function(response) {
                  return response.data;
                });
                return promise;
              }
            };

            var getUserAdsPending = {
              async: function() {
                var promise = $http.get(mainUrl + '/user/ads/pending').then(function(response) {
                  return response.data;
                });
                return promise;
              }
            };

            var getUserInfoByUsername = {
              async: function(username) {
                var promise = $http.get(mainUrl + '/user/'+username).then(function(response) {
                  return response.data;
                });
                return promise;
              }
            };

            return {
                getUserAdsActive: getUserAdsActive,
                getUserAdsPending: getUserAdsPending,
                getUserInfoByUsername:getUserInfoByUsername,
                register: register,
                userUpdateLocation: userUpdateLocation
            };
        });

})();
