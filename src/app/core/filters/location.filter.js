angular
    .module('app.core')
    .filter('locationFormat', function() {
      return function (input) {
        if (!input)
          return;

        // remove all characters except text and space
        var location = input.replace(/[^a-zA-Z \u0370-\u1FFF]/g, "");

        return location;
      };
    });
