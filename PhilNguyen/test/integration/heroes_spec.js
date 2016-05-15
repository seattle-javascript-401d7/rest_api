'use strict';
describe('all the superheroes', function() {
  it('should create a superhero', function() {
    browser.get('http://localhost:5000');
    element(by.model('heroesctrl.newSuperhero.name')).sendKeys('test_superhero');
    element(by.model('heroesctrl.newSuperhero.powerlevel')).sendKeys('4500');
    element(by.id('createsuperhero')).click();
    element.all(by.repeater('superhero in heroesctrl.superheroes'))
    .all(by.tagName('span')).first().getText().then((text) => {
      console.log('text', text);
      expect(text).toEqual('test_superhero has a powerlevel of 4500');
    });
  });

  it('should get a superhero from a test database', function() {
    browser.get('http://localhost:5000');
    let hero = element(by.tagName('span'));
    expect(hero.getText()).toBe('test_superhero has a powerlevel of 4500');
  });

  it('should make an update to an existing superhero', function() {
    browser.get('http://localhost:5000');
    
  })
});
