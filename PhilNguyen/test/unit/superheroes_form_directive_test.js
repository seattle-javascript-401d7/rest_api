const angular = require('angular');
const formTemplate = require('../../public/app/templates/superheroes/directives/superhero_form.html');

describe('superhero form directive', function() {
  beforeEach(angular.mock.module('newApp'));

  var $scope, $httpBackend, $compile, $controller;
  beforeEach(angular.mock.inject(function(_$httpBackend_, $rootScope, _$compile_, _$controller_) {
    $scope = $rootScope.$new();
    $httpBackend = _$httpBackend_;
    $compile = _$compile_;
    $controller = _$controller_;
  }));

  it('should transclude some html', function() {
    $httpBackend.expectGET('templates/superheroes/directives/superhero_form.html').respond(200, formTemplate);
    var testSuperheroFormDirective = $compile('<main data-ng-controller="HeroesController as heroesctrl"><superhero-form data-button-text="\'Update superhero\'"' +
    'data-rest-action="update" data-superhero="superhero">' +
    '<button data-ng-click="superhero.editing=false">Cancel</button></superhero-form></main>')($scope);
    $httpBackend.flush();
    expect(testSuperheroFormDirective.html().indexOf('Update superhero')).not.toBe(-1);

  });
});
