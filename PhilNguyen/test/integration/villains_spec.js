'use strict';
describe('all the villains', function() {
  it('should create a villain', function() {
    browser.get('http://localhost:5000');
    element(by.model('villainsctrl.newVillain.name')).sendKeys('test_villain');
    element(by.model('villainsctrl.newVillain.powerlevel')).sendKeys('24');
    element(by.id('createvillain')).click();
    element.all(by.repeater('villain in villainsctrl.villains'))
    .all(by.tagName('span')).first().getText().then((text) => {
      expect(text).toEqual('test_villain has a powerlevel of 24');
    });
  });

  it('should get a villain from a test database', function() {
    browser.get('http://localhost:5000');
    element.all(by.repeater('villain in villainsctrl.villains'))
    .all(by.tagName('span')).first().getText().then((text) => {
      expect(text).toBe('test_villain has a powerlevel of 24');
    });
  });

  it('should remove a villain from a test database', function() {
    browser.get('http://localhost:5000');
    element.all(by.repeater('villain in villainsctrl.villains'))
    .all(by.tagName('span')).first();
    element(by.id('delete')).click();
    element.all(by.repeater('villain in villainsctrl.villains'))
    .all(by.tagName('span')).getText().then((text) => {
      expect(text).toEqual([]);
    });
  });
});
