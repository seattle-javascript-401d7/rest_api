module.exports = function(app) {
  app.directive('movieListItem', function() {
    return {
      restrict: 'EAC',
      replace: true,
      require: '^ngController',
      transclude: true,
      templateUrl: '/templates/movies/directives/movies_list_item.html',
      scope: {
        movie: '='
      },
      link: function(scope, element, attrs, controller) {
        scope.murder = controller.removeMovie;
      }
    }
  });
}
