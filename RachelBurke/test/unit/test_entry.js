require('../../app/js/entry.js');
require('./wine_controllertest.js');
require('./cheese_controllertest.js');
require('./cheese_directive_test.js');
require('./resource_test.js');
require('./error_service_test.js');


describe('good karma?', () => {
  it('should be good karma', () => {
    expect(true).not.toBe(false);
  });
});
