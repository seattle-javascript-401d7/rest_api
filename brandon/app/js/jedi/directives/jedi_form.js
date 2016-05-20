module.exports = function(app) {
  app.directive('jediForm', function() {
    return {
      restrict: 'EAC',
      replace: true,
      require: '^ngController',
      transclude: true,
      templateUrl: '/templates/jedi/directives/jedi_form.html',
      scope: {
        jedi: '=',
        buttonText: '@',
        action: '@'
      },
      link: function(scope, element, attrs, controller) {
        var actions = {
          update: controller.updateJedi,
          create: controller.createJedi
        };
        scope.save = actions[scope.action];
      }
    };
  });
};
