module.exports = function(app) {
  app.directive('jediForm', function() {
    return {
      restrict: 'EAC',
      replace: true,
      require: '^ngController',
      transclude: true,
      templateUrl: 'js/templates/jedi/directives/jedi_form.html',
      scope: {
        jedi: '=',
        buttonText: '@',
        savemethod: '@'
      },
      link: function(scope, element, attrs, controller) {
        var actions = {
          update: controller.updateJedi,
          create: controller.createJedi
        };
        scope.save = actions[scope.savemethod];
      }
    };
  });
};
