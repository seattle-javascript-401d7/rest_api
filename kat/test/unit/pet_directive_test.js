var angular = require('angular');
var petFormTemplate = require('../../app/templates/pet/directives/pet_form.html');
var petListTemplate = require('../../app/templates/pet/directives/pet_list_item.html');
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

  it('button in form should be customizable', function() {
    $httpBackend.when('GET', '/templates/pet/directives/pet_form.html').respond(200, petFormTemplate);
    var element = $compile('<section data-ng-controller="PetController as petcontrol"><pet-form data-button-text="Test Pet" data-pet=" {}"></pet-form></section>')($scope);
    $httpBackend.flush();
    $scope.$digest();
    expect(element.html()).toContain('Test Pet');
  });

  it('should print a pet list item', function() {
    $httpBackend.when('GET', '/templates/pet/directives/pet_list_item.html')
    .respond(200, petListTemplate);
    $scope.pet = {
      name: 'Apollo',
      nickName: 'Pilly',
      favoriteActivity: 'cuddles'
    };
    var listElement = $compile('<section data-ng-controller="PetController as petcontrol"><pet-list-item data-pet="pet"></pet-list-item></section>')($scope);
    $httpBackend.flush();
    expect(listElement.html()).toContain('Apollo aka Pilly really likes cuddles');
  });
});
