require('../../app/js/entry.js');
require('./wine_controller_test.js');
require('./cheese_controller_test.js');

describe('good karma?', () => {
  it('should be good', () => {
    expect(true).not.toBe(false);
  });
});
