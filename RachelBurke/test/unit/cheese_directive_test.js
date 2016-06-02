var angular = require('angular');
var cheeseFormTemplate = require('../../app/templates/cheese_directives/cheese_form.html');
var cheeseListTemplate = require('../../app/templates/cheese_directives/cheese_list_item.html');
require('angular-mocks');

describe('cheese directive', function() {
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
    $httpBackend.when('GET', '/templates/cheese_directives/cheese_form.html').respond(200, cheeseFormTemplate);
    var element = $compile('<section data-ng-controller="CheeseController as cheesecontrol"><cheese-form data-button-text="Test Cheese" data-wine=" {}"></cheese-form></section>')($scope);
    $httpBackend.flush();
    $scope.$digest();
    expect(element.html()).toContain('Test Cheese');
  });

  it('should print a cheese list item', function() {
    $httpBackend.when('GET', '/templates/cheese_directives/cheese_list_item.html').respond(200, cheeseListTemplate);
    $scope.cheese = {
      name: 'Manchego',
      country: 'Spain',
      origin: 'Sheep'
    };

    var listElement = $compile('<section data-ng-controller = "CheeseController as cheesecontrol"><cheese-list-item data-cheese="cheese"></cheese-list-item></section>')($scope);
    $httpBackend.flush();
    expect(listElement.html()).toContain('Manchego produced in Spain made from Sheep');
  });
});
