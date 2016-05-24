const angular = require('angular');
const formTemplate = require('../../public/app/templates/superheroes/directives/superhero_form.html');

describe('villain form directive', function() {
  beforeEach(angular.mock.module('newApp'));

  var $scope, $httpBackend, $compile;
  beforeEach(angular.mock.inject(function(_$httpBackend_, $rootScope, _$compile_) {
    $scope = $rootScope.$new();
    $httpBackend = _$httpBackend_;
    $compile = _$compile_;
  }));

  it('should transclude some html', function() {
    $httpBackend.expectGET('templates/villains/directives/villain_form.html').respond(200, formTemplate);
    var testVillainFormDirective = $compile('<main data-ng-controller="VillainsController as villainsctrl">' + 
    '<villain-form data-button-text="\'Update villain\'"' +
    'data-rest-action="update" data-villain="villain">' +
    '<button data-ng-click="villain.editing=false">Cancel</button></villain-form>')($scope);
    $httpBackend.flush();
    expect(testVillainFormDirective.html().indexOf('Update villain')).not.toBe(-1);

  });
});
