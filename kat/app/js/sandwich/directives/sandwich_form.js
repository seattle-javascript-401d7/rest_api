module.exports = function(app) {
  app.directive('sandwichForm', function() {
    return {
      restrict: 'EAC',
      replace: true,
      require: '^ngController',
      transclude: true,
      templateUrl: '/templates/sandwich/directives/sandwich_form.html',
      scope: {
        sandwich: '=',
        buttonText: '@',
        change: '@'
      },
      link: function(scope, element, attrs, controller) {
        var changes = {
          update: controller.updateSandwich,
          create: controller.createSandwich
        };
        scope.save = changes[scope.change];
      }
    };
  });
};
