module.exports = function(app) {
  app.directive('petListItem', function() {
    return {
      restrict: 'EAC',
      replace: true,
      teplateUrl: '/templates/pet/directives/pet_list_item.html',
      scope: {
        pet: '='
      }
    };
  });
};
