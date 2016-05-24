module.exports = function(app) {
  app.directive('sandwichListItem', function() {
    return {
      restrict: 'EAC',
      replace: true,
      require: '^ngController',
      transclude: true,
      templateUrl: '/templates/sandwich/directives/sandwich_list_item.html',
      scope: {
        sandwich: '='
      },
      link: function(scope, element, attrs, controller) {
        scope.eat = controller.deleteSandwich;
      }
    };
  });
};
