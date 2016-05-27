module.exports = function(app) {
  app.factory('totalErrorHandle', function() {
    return function(errorsArray, message) {
      return function(err) {
        console.log(err);
        if (Array.isArray(errorsArray)) {
          errorsArray.push(new Error(message || 'server not happy'));
        }
      };
    };
  });
};
