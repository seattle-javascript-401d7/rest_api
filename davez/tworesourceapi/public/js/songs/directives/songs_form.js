module.exports = function(app) {
  app.directive('songForm', function() {
    return {
      restrict: 'EAC',
      require: '^ngController',
      transclude: true,
      templateUrl: '/templates/songs/directives/songs_form.html',
      scope: {
        song: '=',
        buttonText: '@',
        crud: '@'
      },
      link: function(scope, element, attrs, controller) {
        var cruds = {
          update: controller.updateSong,
          create: controller.createSong
        };
        scope.save = cruds[scope.crud];
      }
    };
  });
};
