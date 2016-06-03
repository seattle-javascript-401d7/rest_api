var angular = require('angular');
var wineFormTemplate = require('../../app/templates/wine_directives/wine_form.html');
var wineListTemplate = require('../../app/templates/wine_directives/wine_form.html');
require('angular-mocks');

describe('wine form directive', function() {
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
    $httpBackend.when('GET', '/templates/wine_directives/wine_form.html').respond(200, wineFormTemplate);
    var element = $compile('<section data-ng-controller="WineController as winecontrol"><wine-form data-button-text="Test Wine" data-wine=" {}"></wine-form></section>')($scope);
    $httpBackend.flush();
    $scope.$digest();
    expect(element.html()).toContain('Test Wine');
  });

  it('should print a wine list item', function() {
    $httpBackend.when('GET', '/templates/wine_directives/wine_list_item.html').respond(200, wineListTemplate);
    $scope.wine = {
      name: 'Merlot',
      year: '2016',
      country: 'France'
    };

    var listElement = $compile('<section data-ng-controller = "WineController as winecontrol"><wine-list-item data-wine="wine"></wine-list-item></section>')($scope);
    $httpBackend.flush();
    expect(listElement.html()).toContain('Merlot from 2016 grown in France');
  });
});
