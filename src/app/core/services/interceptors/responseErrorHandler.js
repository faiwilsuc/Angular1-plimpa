angular
    .module('app.core')
    .factory('responseErrorHandler', ['$q', '$injector', 'user', function($q, $injector, user) {
        return {
            /**
             * Checks if the response contains information that the session has expired.
             * If it has, the handler will reload the current page. The handler is
             * designed to deal with session expiration while sending ajax requests.
             */
            'responseError': function(response) {
                console.log("Error response redirect: " + response)
                if (response.status === 401) {
                    $injector.get('$state').transitionTo('home.login');
                    user.active = false;
                }
                return $q.reject(response);
            }
        };
    }]);
