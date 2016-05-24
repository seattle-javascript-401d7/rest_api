var angular = require('angular');
var template = require('../../app/templates/sandwich/directives/sandwich_form.html');
var sandwichListTemplate = require('../../app/templates/sandwich/directives/sandwich_list_item.html');
require('angular-mocks');


describe('sandwich directives', function() {
  var $scope;
  var $compile;
  var $httpBackend;

  beforeEach(angular.mock.module('practiceApp'));

  beforeEach(angular.mock.inject(function(_$compile_, $rootScope, _$httpBackend_) {
    $compile = _$compile_;
    $scope = $rootScope.$new();
    $httpBackend = _$httpBackend_;
  }));
// maybe create a new controller??
  it('-form directive version', function() {
    $httpBackend.when('GET', '/templates/sandwich/directives/sandwich_form.html').respond(200, template);
    var element = $compile('<section data-ng-controller="SandwichController as sandwichcontrol"><sandwich-form data-button-text="Test Sandwich" data-sandwich=" {}"></sandwich-form></section>')($scope);
    $httpBackend.flush();
    $scope.$digest();
    expect(element.html()).toContain('Test Sandwich');
  });

  it('should print a sandwich list item', function() {
    $httpBackend.when('GET', '/templates/sandwich/directives/sandwich_list_item.html')
    .respond(200, sandwichListTemplate);
    $scope.sandwich = {
      type: 'Lettuce Sandwich',
      ingrediants: ['Lettuce', 'Bread'],
      yumFactor: 1
    };
    var listElement = $compile('<section data-ng-controller="SandwichController as sandwichcontrol"><sandwich-list-item data-sandwich="sandwich"></sandwich-list-item></section>')($scope);
    $httpBackend.flush();
    expect(listElement.html()).toContain('Lettuce Sandwich needs ["Lettuce","Bread"] and has a yum factor 1');
  });

});
