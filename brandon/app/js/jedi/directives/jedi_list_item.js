module.exports = function(app) {
  app.directive('jediListItem', function() {
    return {
      restrict: 'EAC',
      replace: true,
      require: '^ngController',
      transclude: true,
      templateUrl: 'js/templates/jedi/directives/jedi_list_item.html',
      scope: {
        jedi: '='
      },
      link: function(scope, element, attrs, controller) {
        scope.remove = controller.removeJedi;
        scope.edit = controller.editJedi;
      }
    };
  });
};
