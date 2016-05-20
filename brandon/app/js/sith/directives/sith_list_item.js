module.exports = function(app) {
  app.directive('sithListItem', function() {
    return {
      restrict: 'EAC',
      replace: true,
      transclude: true,
      require: '^ngController',
      templateUrl: '/templates/sith/directives/sith_list_item.html',
      scope: {
        sith: '='
      },
      link: function(scope, element, attrs, controller) {
        scope.remove = controller.removeSith;
      }
    };
  });
};
