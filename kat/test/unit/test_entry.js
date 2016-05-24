require('../../app/js/entry.js');
require('./pet_controller_test.js');
require('./sandwich_controller_test.js');
require('./pet_directive_test.js');
require('./sandwich_directive_test.js');

describe('does karma work?', () => {
  it('should work', () => {
    expect(true).not.toBe(false);
  });
});
