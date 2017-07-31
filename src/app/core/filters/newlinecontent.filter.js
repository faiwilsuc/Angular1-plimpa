angular
  .module('app.core')
  .filter('contain_newlines', function() {
    return function(data) {
      if (!data) return data;
      return data.replace(/\n\r?/g, '<br />');
    };
  });
