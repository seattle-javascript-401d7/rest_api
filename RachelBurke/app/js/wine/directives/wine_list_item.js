module.exports = function(app) {
  app.directive('wineListItem', function() {
    return {
      restrict: 'EAC',
      replace: true,
      require: '^ngController',
      transclude: true,
      templateUrl: '/templates/wine/directives/wine_list_item.html',
      scope: {
        pet: '='
      },
      link: function(scope, element, attrs, controller) {
        scope.sell = controller.deletePet;
      }
    };
  });
};
