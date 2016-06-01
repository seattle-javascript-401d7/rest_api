var angular = require('angular');
var wineFormTemplate = require('../../app/templates/wine_directives/wine_form.html');
var cheeseFormTemplate = require('../../app/templates/cheese_directives/cheese_form.html');
require('angular-mocks');

describe('wine form directive', function() {
  var $scope;
  var $compile;
  var $httpBackend;

  beforeEach(angular.mock.module('practiveApp'));

  beforeEach(angular.mock.inject(function(_$compile_, $rootScope, _$httpBackend_) {
    $compile = _$compile_;
    $scope = $rootScope.$new();
    $httpBackend = _$httpBackend_;
  }));

  it('button in form should be customizable', function() {
    $httpBackend.when('GET', '/templates/wine_directives/wine_form.html')
  .respond(200, wineListTemplate);
    $scope.wine = {
      name: 'Merlot',
      description: 'Dry'
    };
    var listElement = $compile('<section data-ng-controller = "WineController as winecontrol"><wine-list-item data-wine="wine"></wine-list-item></section>')($scope);
    $httpBackend.flush();
    expect(listElement.html()).toContain('Merlot usually is not dry');
  });
});
