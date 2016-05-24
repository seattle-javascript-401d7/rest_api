var angular = require('angular');
var template = require('../../app/templates/sandwich/directives/sandwich_form.html');
require('angular-mocks');


describe('sandwich form directive', function() {
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
  it('should show what the real content is', function() {
    $httpBackend.when('GET', '/templates/sandwich/directives/sandwich_form.html').respond(200, template);
    var element = $compile('<section data-ng-controller="SandwichController as sandwichcontrol"><sandwich-form data-button-text="Test Sandwich" data-sandwich=" {}"></sandwich-form></section>')($scope);
    $httpBackend.flush();
    $scope.$digest();
    expect(element.html()).toContain('Test Sandwich');
  });
});
