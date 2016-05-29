module.exports = function(app) {
  app.directive('movieForm', function() {
    return {
      restrict: 'EAC',
      require: '^ngController',
      transclude: true,
      templateUrl: '/templates/movies/directives/movies_form.html',
      scope: {
        movie: '=',
        buttonText: '@',
        crud: '@'
      },
      link: function(scope, element, attrs, controller) {
        var cruds = {
          update: controller.updateMovie,
          create: controller.createMovie
        };
        scope.save = cruds[scope.crud];
      }
    };
  });
};
