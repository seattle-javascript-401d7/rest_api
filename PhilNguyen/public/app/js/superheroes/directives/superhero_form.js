module.exports = function(app) {
  app.directive('superheroForm', function() {
    return {
      restrict: 'EAC',
      replace: true,
      require: '^ngController',
      transclude: true,
      templateUrl: '/templates/superheroes/directives/superhero_form.html',
      scope: {
        superhero: '=',
        buttonText: '@',
        restAction: '@'
      },
      link: function(scope, element, attrs, controller) {
        var actions = {
          update: controller.updateSuperhero,
          create: controller.createSuperhero
        };
        scope.save = actions[scope.restAction];
      }
    };
  });
};
