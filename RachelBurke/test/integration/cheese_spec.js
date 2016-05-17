describe('the cheese POST function', function () {
  it('it should add some cheese', function () {
    browser.get('http://localhost:5000');
    element(by.model('cheesectrl.newCheese.title')).sendKey('Raclette');
    element(by.id('createCheese')).click();
    var el = element(by.repeater('cheese in cheesectrl.cheese').row(0).column('type'));
    el.getText().then((text) => {
      el.getText().then((text) => {
        expect(text).toEqual('There are many types of cheese.');
      });
    });

    it('updates a cheese', () => {
      browser.get('http://localhost:5000');
      var elField = element(by.repeater('cheese in cheesectrl.cheese').row(0));
      var editBtn = elField.element(by.buttonText("Edit"));
      editBtn.click();
      element(by.model('cheese.type')).cear().sendKeys('some type of cheese');
      element(by.model('cheese.cheeseName')).clear().sendKeys('Gruyere');
      var updateBtn = elField.element(by.buttonText('Update Cheese'));
      updateBtn.click();
      var el = element(by.repeater('cheese in cheesectrl.cheese').row(0).column('type'));
      el.getText().then((text) => {
        expect(text).toEqual('Gruyere is one of many types of cheese.')
      });
    });

    it('cancels a cheese update', () => {
      browser.get('http://localhost:5000');
      var elField = element(by.repeater('cheese in cheesectrl.cheese').row(0));
      var delBtn = elField.element(by.buttonText("remove This Cheese"));
      delBtn.click();
      var el = element(by.repeater('cheese in cheesectrl.cheese').row(0).column('type'));
      expect(el.isPresent()).toBe(false);
  });
});
