module.exports = function(app) {
  app.directive('cheeseListItem', function() {
    return {
      restrict: 'EAC',
      replace: true,
      require: '^ngController',
      transclude: true,
      templateUrl: '/templates/cheese_directives/cheese_list_item.html',
      scope: {
        cheese: '='
      },
      link: function(scope, element, attrs, controller) {
        scope.eat = controller.deleteCheese;
      }
    };
  });
};
