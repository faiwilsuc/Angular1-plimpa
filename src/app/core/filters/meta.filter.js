angular
  .module('app.core')
  .filter('metaTitle', function() {
    function toTitleCase(str) {
      return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }

    return function (input) {
      if (!input)
        return;
      else {
        return toTitleCase(input.replace(/-/g, " "));
      }
    };

  })
  .filter('metaDescription', function() {
    return function (input) {

      if (!input)
        return;

      var text = input.replace(/-/g, " ");
      text = input.split(' ').slice(0,10).join(' ');
      return text;
    };
  });

