angular.module('app.core')
    .filter('datefromNow', function() {
        return function(input, format) {
            return moment(new Date(input)).fromNow();
        };
    })
    .filter('dateFormat', function() {
        return function(input, format) {
            return moment(new Date(input)).format(format);
        };
    })
    .filter('dateFormatLL', function() {
        return function(input, format) {
            return moment(input, 'll').format(format);
        };
    });