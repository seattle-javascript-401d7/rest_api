module.exports = function(app) {
  app.directive('villainForm', function() {
    return {
      restrict: 'EAC',
      replace: true,
      transclude: true,
      templateUrl: 'templates/villains/directives/villain_form.html',
      require: '^ngController',
      scope: {
        villain: '=',
        buttonText: '@',
        restAction: '@'
      },
      link: function(scope, element, attrs, controller) {
        var actions = {
          update: controller.updateVillain,
          create: controller.createVillain
        };
        scope.save = actions[scope.restAction];
      }
    };
  });
};
