module.exports = function(app) {
  app.directive('sithForm', function() {
    return {
      restrict: 'EAC',
      replace: true,
      require: '^ngController',
      transclude: true,
      templateUrl: 'js/templates/sith/directives/sith_form.html',
      scope: {
        sith: '=',
        buttonText: '@',
        savemethod: '@'
      },
      link: function(scope, element, attrs, controller) {
        var actions = {
          update: controller.updateSith,
          create: controller.createSith
        };
        scope.save = actions[scope.savemethod];
      }
    };
  });
};
