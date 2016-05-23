module.exports = function(app) {
  app.directive('sithListItem', function() {
    return {
      restrict: 'EAC',
      replace: true,
      require: '^ngController',
      transclude: true,
      templateUrl: 'js/templates/sith/directives/sith_list_item.html',
      scope: {
        sith: '='
      },
      link: function(scope, element, attrs, controller) {
        scope.remove = controller.removeSith;
        scope.edit = controller.editSith;
      }
    };
  });
};
