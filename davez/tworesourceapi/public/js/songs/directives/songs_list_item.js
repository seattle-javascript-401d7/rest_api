module.exports = function(app) {
  app.directive('songsListItem', function() {
    return {
      restrict: 'EAC',
      replace: true,
      require: '^ngController',
      transclude: true,
      templateUrl: '/templates/songs/directives/songs_list_item.html',
      scope: {
        song: '='
      },
      link: function(scope, element, attrs, controller) {
        scope.murder = controller.removeSong;
      }
    }
  });
}
