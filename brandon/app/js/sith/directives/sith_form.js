module.exports = function(app) {
  app.directive('sithForm', function() {
    return {
      restrict: 'EAC',
      replace: true,
      require: '^ngController',
      transclude: true,
      templateUrl: '/templates/sith/directives/sith_form.html',
      scope: {
        sith: '=',
        buttonText: '@',
        action: '@'
      },
      link: function(scope, element, attrs, controller) {
        var actions = {
          update: controller.updateSith,
          create: controller.createSith
        };
        scope.save = actions[scope.action];
      }
    };
  });
};
