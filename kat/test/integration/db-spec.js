describe('CRUD angular app', function() {
  it('should have a 2 way data binding', function() {
    browser.get('http://localhost:5000');
    element(by.model('petcontrol.newPet.name')).sendKeys('test pet');
    element(by.model('petcontrol.newPet.name')).sendKeys('test');
    element(by.id('#petlist li:last-child').getText(function(text) {
      expect(text).toEqual('test pet aka test really likes cuddles');
  }));
});
});
