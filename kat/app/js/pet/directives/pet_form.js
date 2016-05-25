module.exports = function(app) {
  app.directive('petForm', function() {
    return {
      restrict: 'EAC',
      replace: true,
      require: '^ngController',
      transclude: true,
      templateUrl: '/templates/pet/directives/pet_form.html',
      scope: {
        pet: '=',
        buttonText: '@',
        change: '@'
      },
      link: function(scope, element, attrs, controller) {
        var changes = {
          update: controller.updatePet,
          create: controller.createPet
        };
        scope.save = changes[scope.change];
      }
    };
  });
};
