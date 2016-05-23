var angular = require('angular');
var template = require('../../app/templates/pet/directives/pet_form.html');
require('angular-mocks');


describe('pet form directive', function() {
  var $scope;
  var $compile;
  var $httpBackend;

  beforeEach(angular.mock.module('practiceApp'));

  beforeEach(angular.mock.inject(function(_$compile_, $rootScope, _$httpBackend_) {
    $compile = _$compile_;
    $scope = $rootScope.$new();
    $httpBackend = _$httpBackend_;
  }));

  it('should show what the real content is', function() {
    $httpBackend.when('GET', '/templates/pet/directives/pet_form').respond(200, template);
    var element = $compile('<pet-form data-ng-if="pet.editing" data-button-text="Test Pet" data-change="update" data-pet="pet"></pet-form>')($scope);
    $httpBackend.flush();
    $scope.$digest();
    expect(element.html()).toContain('Test Pet');
  });
});
