/**
 *  Module
 *
 * Description
 */
(function() {
    "use strict"

    angular
        .module('app.core')
        .factory("utilsService", function(mainUrl, $http, $state, toastr, user, postAddData, jsonGeoIpURL) {

            var checkLogin = {
                async: function(username) {
                    var promise = $http.get(mainUrl + '/utils/check_username/' + username + '/').then(function(response) {
                        return response.data;
                    });
                    return promise;
                }
            };

            var checkEmail = {
                async: function(email) {
                    var promise = $http.get(mainUrl + '/utils/check_email/' + email + '/').then(function(response) {
                        return response.data;
                    });
                    return promise;
                }
            };

            var getGeoCodeAddr = {
                async: function(lat, lng) {
                    var promise = $http.get(mainUrl + '/utils/geocode/address/' + lat + '/' + lng + '/').then(function(response) {
                        return response.data;
                    });
                    return promise;
                }
            };

            var getGeoIPJson = {
              async: function() {
                var promise = $http.get(jsonGeoIpURL).then(function(response) {
                  return response.data;
                });
                return promise;
              }
            };

            var checkAuth = {
                async: function() {
                    // var promise = $http.get(mainUrl + '/utils/check_auth').then(function(response) {
                    var promise = $http.get(mainUrl + '/utils/check_auth_state').then(function(response) {
                        return response.data;
                    });
                    return promise;
                }
            };

            var getAuthUserName = {
                async: function() {
                    var promise = $http.get(mainUrl + '/utils/get_auth_username').then(function(response) {
                        return response.data;
                    });
                    return promise;
                }
            };

            var sendPostAdErrorReport = {
                async: function(reportData) {

                    var promise = $http({
                        method: 'POST',
                        url: mainUrl + '/utils/contact/error/post_ad',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        data: reportData
                    }).then(function(response) {
                        return response.data;
                    });

                    return promise;
                }
            }

            var logOut = function() {
                $http.get(mainUrl + '/logout').then(function(response) {
                    console.log(user)
                    user = {};
                    console.log(user)
                    postAddData = {};
                    toastr.success('Logged out');
                    $state.go('home', {}, { reload: true });

                    console.info('logged out', response);
                });
            }

            return {
                checkLogin: checkLogin,
                checkEmail: checkEmail,
                getGeoCodeAddr: getGeoCodeAddr,
                getGeoIPJson: getGeoIPJson,
                checkAuth: checkAuth,
                getAuthUserName: getAuthUserName,
                sendPostAdErrorReport: sendPostAdErrorReport,
                logOut: logOut
            };
        });

})();
