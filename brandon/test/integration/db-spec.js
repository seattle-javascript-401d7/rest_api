describe('a simple test to pass', () => {
  it('should test something', () => {
    browser.get('http://localhost:3000');
    element(by.model('jediCtrl.newJedi.name')).sendKeys('test');
    element(by.id('createJedi')).click();
    element.all(by.css('#jediList:first-child')).getText(function(text) {
      expect(text.toEqual('test jedi is a jedi who likes something'));
    });
  });
});
