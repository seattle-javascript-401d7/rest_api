module.exports = function(app) {
  app.directive('superheroListItem', function() {
    return {
      restrict: 'EAC',
      replace: true,
      require: '^ngController',
      templateUrl: '/templates/superheroes/directives/superhero_list_item.html',
      transclude: true,
      scope: {
        superhero: '='
      },
      link: function(scope, element, attrs, controller) {
        scope.delete = controller.removeSuperhero;
      }
    };
  });
};
