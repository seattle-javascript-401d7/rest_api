'use strict';
describe('all the superheroes', function() {
  it('should create a superhero', function() {
    browser.get('http://localhost:5000');
    element(by.model('heroesctrl.newSuperhero.name')).sendKeys('test_superhero');
    element(by.model('heroesctrl.newSuperhero.powerlevel')).sendKeys('4500');
    element(by.id('createsuperhero')).click();
    element.all(by.repeater('superhero in heroesctrl.superheroes'))
    .all(by.tagName('span')).first().getText().then((text) => {
      expect(text).toEqual('test_superhero has a powerlevel of 4500');
    });
  });

  it('should get a superhero from a test database', function() {
    browser.get('http://localhost:5000');
    element.all(by.repeater('superhero in heroesctrl.superheroes'))
    .all(by.tagName('span')).first().getText().then((text) => {
      expect(text).toEqual('test_superhero has a powerlevel of 4500');
    });
  });

  it('should make an update to an existing superhero', function() {
    browser.get('http://localhost:5000');
    element.all(by.repeater('superhero in heroesctrl.superheroes').row(0));
    element(by.id('edit')).click();
    element(by.model('superhero.powerlevel')).clear().sendKeys('6000');
    element(by.id('updatesuperhero')).click();
    element.all(by.repeater('superhero in heroesctrl.superheroes')).all(by.tagName('span'))
    .first().getText()
    .then((text) => {
      expect(text).toEqual('test_superhero has a powerlevel of 6000');
    });
  });


  it('should remove a superhero from a test database', function() {
    browser.get('http://localhost:5000');
    element.all(by.repeater('superhero in heroesctrl.superheroes'))
    .all(by.tagName('span')).first();
    element(by.id('delete')).click();
    element.all(by.repeater('superhero in heroesctrl.superheroes'))
    .all(by.tagName('span')).getText().then((text) => {
      expect(text).toEqual([]);
    });
  });
});
