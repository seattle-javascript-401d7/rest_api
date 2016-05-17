describe('the wine POST function', function() {
  it('adds a wine', () => {
    browser.get('http://localhost:5000');
    element(by.model('winectrl.newWine.wineName')).sendKeys('test wine');
    element(by.id('createWine')).click();
    var el = element(by.repeater('wine in winectrl.wine').row(0).column('wineName'));
    el.getText().then((text) => {
      expect(text).toEqual('test wine is a bordeaux.');
    });
  });

  it('updates a wine', () => {
    browser.get('http://localhost:5000');
    var elField = element(by.repeater('wine in winesctrl.wine').row(0));
    var editBtn = elField.element(by.buttonText("Edit"));
    editBtn.click();
    element(by.model('wine.wineName')).clear().sendKeys('some wine');
    element(by.model('wine.description')).clear().sendKeys('french');
    var updateBtn = elField.element(by.buttonText('Update Wine'));
    updateBtn.click();
    var el = element(by.repeater('wine in winectrl.wine').row(0).column('wineName'));
    el.getText().then((text) => {
      expect(text).toEqual('some wine is french wine.');
    });
  });

  it ('cancels a wine update', () => {
    browser.get('http://localhost:5000');
    var elField = element(by.repeater('wine in winectrl.wine').row(0));
    var editBtn = elField.element(by.buttonText("Edit"));
    editBtn.click();
    element(by.model('wine.wineName')).clear().sendKeys('bad wine');
    element(by.model('wine.genre')).clear().sendKeys('bad sweet wine');
    var cancelBtn = elField.element(by.buttonText('Clear'));
    cancelBtn.click();
    var el = element(by.repeater('wine in winectrl.wine').row(0).column('wineName'));
    el.getText().then((text) => {
      expect(text).toEqual('some wine is french wine.');
    });
  });

  it('deletes a wine', () => {
    browser.get('http://localhost:5000');
    var elField = element(by.repeater('wine in winctrl.wine').row(0));
    var delBtn = elField.element(by.buttonText("Remove This Wine"));
    delBtn.click();
    var el = element(by.repeater('wine in winectrl.wine').row(0).column('wineName'));
    expect(el.isPresent()).toBe(false);
  });
});
