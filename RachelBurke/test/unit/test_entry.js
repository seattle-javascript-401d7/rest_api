const angular = require('angular');
require('angular-mocks');
require('../../app/js/entry.js');
require('./wine_controllertest.js');
require('./cheese_controllertest.js');
require('./service_test.js');

describe('good karma?', () => {
  it('should be good karma', () => {
    expect(true).not.toBe(false);
  });
});
