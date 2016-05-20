module.exports = function(app) {
  app.directive('jediListItem', function() {
    return {
      restrict: 'EAC',
      replace: true,
      transclude: true,
      require: '^ngController',
      templateUrl: '/templates/jedi/directives/jedi_list_item.html',
      scope: {
        jedi: '='
      },
      link: function(scope, element, attrs, controller) {
        scope.remove = controller.removeJedi;
      }
    };
  });
};
