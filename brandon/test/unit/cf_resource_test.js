var angular = require('angular');

describe('cfResource', () => {
  var $httpBackend;
  var cfResource;
  var baseUrl = 'http://localhost:3000/api/jedi';

  beforeEach(angular.mock.module('liveApp'));
  beforeEach(angular.mock.inject((_$httpBackend_) => {
    $httpBackend = _$httpBackend_;
  }));

  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should return a function', angular.mock.inject(function(cfResource) {
    expect(typeof cfResource).toBe('function');
  }));

  // it('should get get everything in the resource', angular.mock.inject(function(cfResource) {
  //   $httpBackend.expectGET(baseUrl).respond(200, [{ name: 'yoda' }]);
  //
  //   var resourceArray = [{}, {}];
  //   var errorsArray = [];
  //   var resource = new cfResource(resourceArray, errorsArray, baseUrl);
  //
  //   resource.getAll();
  //   $httpBackend.flush();
  //   console.log(resourceArray);
  //   expect(resourceArray.length).toBe(3);
  //   expect(resourceArray[0].name).toBe('yoda');
  // }));

  it('should add to the array', angular.mock.inject(function(cfResource) {
    $httpBackend.expectPOST(baseUrl, { name: 'test jedi' }).respond(200, {
        name: 'completely different jedi', _id: 0 });
      var testArr = [];
      var errorsArr = [];
      var testRemote = new cfResource(testArr, errorsArr, baseUrl);
      testRemote.create({ name: 'test jedi' });
      $httpBackend.flush();
      expect(testArr.length).toBe(1);
      expect(errorsArr.length).toBe(0);
      expect(testArr[0].name).toBe('completely different jedi');
  }));

  it('should update an entry', angular.mock.inject(function(cfResource, $q) {
    var testJedi = { name: 'test jedi', _id: 1 };
    var testArr = [testJedi];
    var errorsArr = [];
    var testRemote = new cfResource(testArr, errorsArr, baseUrl);

    $httpBackend.expectPUT('http://localhost:3000/api/jedi/1', testJedi).respond(200);
    var result = testRemote.update(testJedi);
    $httpBackend.flush();
    expect(errorsArr.length).toBe(0);
    expect(result instanceof $q).toBe(true);
  }));
});
