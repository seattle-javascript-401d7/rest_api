module.exports = function(app) {
  app.directive('petListItem', function() {
    return {
      restrict: 'EAC',
      replace: true,
      require: '^ngController',
      transclude: true,
      templateUrl: '/templates/pet/directives/pet_list_item.html',
      scope: {
        pet: '='
      },
      link: function(scope, element, attrs, controller) {
        scope.sell = controller.deletePet;
      }
    };
  });
};
