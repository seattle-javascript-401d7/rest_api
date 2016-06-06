module.exports = function(app) {
  app.directive('cheeseForm', function() {
    return {
      restrict: 'EAC',
      replace: true,
      require: '^ngController',
      transclude: true,
      templateUrl: '/templates/cheese_directives/cheese_form.html',
      scope: {
        cheese: '=',
        buttonText: '@',
        change: '@'
      },
      link: function(scope, element, attrs, controller) {
        var changes = {
          update: controller.updateCheese,
          create: controller.createCheese
        };
        scope.save = changes[scope.change];
      }
    };
  });
};
