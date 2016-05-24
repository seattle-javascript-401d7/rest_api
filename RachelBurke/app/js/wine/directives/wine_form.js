module.exports = function(app) {
  app.directive('wineForm', function() {
    return {
      restrict: 'EAC',
      replace: true,
      require: '^ngController',
      transclude: true,
      templateUrl: '/templates/wine/directives/wine_form.html',
      scope: {
        wine: '=',
        buttonText: '@',
        change: '@'
      },
      link: function(scope, element, attrs, controller) {
        var changes = {
          update: controller.updateWine,
          create: controller.createWine
        };
        scope.save = changes[scope.change];
      }
    };
  });
};
