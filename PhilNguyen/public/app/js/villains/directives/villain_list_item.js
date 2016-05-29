module.exports = function(app) {
  app.directive('villainListItem', function() {
    return {
      restrict: 'EAC',
      replace: true,
      require: '^ngController',
      templateUrl: '/templates/villains/directives/villain_list_item.html',
      transclude: true,
      scope: {
        villain: '='
      },
      link: function(scope, element, attrs, controller) {
        scope.delete = controller.removeVillain;
      }
    };
  });
};
