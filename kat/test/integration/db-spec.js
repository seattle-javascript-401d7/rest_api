describe('CRUD angular app', function() {
  it('should have a 2 way data binding', function() {
    browser.get('http://localhost:5000')
    element(by.id('#petlist li:last-child').getText(function(text) {
      expect(text).toEqual('test pet aka test really likes tests');
  });
});



    element(by.model('bearsctrl.newBear.name')).sendKeys('test bear');
    element(by.id('createbear')).click();
    element.all(by.css('#bearslist li:last-child span')).getText(function(text) {
      expect(text).toEqual('test bear (gender: m) weighs 500 lbs and has a strength of 10');
    });
  });
