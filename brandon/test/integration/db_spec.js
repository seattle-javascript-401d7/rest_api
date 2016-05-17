describe('the Jedi Tests', () => {
  it('should create a test Jedi', () => {
    browser.get('http://localhost:5000');
    element(by.model('jediCtrl.newJedi.name')).sendKeys('testman');
    element(by.model('jediCtrl.newJedi.ranking')).sendKeys('badass');
    element(by.model('jediCtrl.newJedi.weaponPreference')).sendKeys('stick thing');
    element(by.model('jediCtrl.newJedi.lightsaberColor')).sendKeys('WHO CARES');
    element(by.model('jediCtrl.newJedi.catchphrase')).sendKeys('WOOOOO');
    element(by.model('jediCtrl.newJedi.handCount')).sendKeys('2');
    element(by.css('.create-jedi')).click();
    element(by.css('.jediList li:last-child p')).getText((text) => {
      expect(text).toEqual('testman is a badass who uses a stick thing. Their lightsaber is ' +
       'WHO CARES and their catchphrase is WOOOOO with 2 hands.');
    });
  });

  it('should check for a list of jedis, and the last one was just created in the test', () => {
    browser.get('http://localhost:5000');
    element(by.css('.jediList li:last-child p')).getText().then((text) => {
      expect(text).toEqual('testman is a badass who uses a stick thing. Their lightsaber is ' +
       'WHO CARES and their catchphrase is WOOOOO with 2 hands.');
    });
  });

  it('should not update from cancel button', () => {
    browser.get('http://localhost:5000');
    element(by.css('.jediList li:last-child .edit-jedi')).click();
    element(by.model('jedi.name')).clear().sendKeys('a new jedi');
    element(by.model('jedi.ranking')).clear().sendKeys('noob');
    element(by.model('jedi.weaponPreference')).clear().sendKeys('computer');
    element(by.model('jedi.lightsaberColor')).clear().sendKeys('black and white');
    element(by.model('jedi.catchphrase')).clear().sendKeys('new phrase');
    element(by.model('jedi.handCount')).clear().sendKeys('1');
    element(by.css('.jediList li:last-child .cancel-jedi')).click();
    element(by.css('.jediList li:last-child p')).getText().then((text) => {
      expect(text).toEqual('testman is a badass who uses a stick thing. Their lightsaber is ' +
       'WHO CARES and their catchphrase is WOOOOO with 2 hands.');
    });
  });

  it('should update the last jedi in the list', () => {
    browser.get('http://localhost:5000');
    element(by.css('.jediList li:last-child .edit-jedi')).click();
    element(by.model('jedi.name')).clear().sendKeys('a new jedi');
    element(by.model('jedi.ranking')).clear().sendKeys('noob');
    element(by.model('jedi.weaponPreference')).clear().sendKeys('computer');
    element(by.model('jedi.lightsaberColor')).clear().sendKeys('black and white');
    element(by.model('jedi.catchphrase')).clear().sendKeys('new phrase');
    element(by.model('jedi.handCount')).clear().sendKeys('1');
    element(by.css('.jediList li:last-child .update-jedi')).click();
    element(by.css('.jediList li:last-child p')).getText().then((text) => {
      expect(text).toEqual('a new jedi is a noob who uses a computer. Their lightsaber is ' +
      'black and white and their catchphrase is new phrase with 1 hands.');
    });
  });

  it('should delete the last jedi', () => {
    browser.get('http://localhost:5000');
    element(by.css('.jediList li:last-child .remove-jedi')).click();
    element(by.css('.jediList li:last-child p')).getText().then( (text) => {
      expect(text).not.toEqual('a new jedi is a noob who uses a computer. Their lightsaber is ' +
      'black and white and their catchphrase is new phrase with 1 hands');
    });
  });
});

describe('the Sith E2E tests', () => {
  it('should create a new test Sith', () => {
    browser.get('http://localhost:5000');
    element(by.model('sithCtrl.newSith.name')).sendKeys('totally not a jedi');
    element(by.model('sithCtrl.newSith.ranking')).sendKeys('newb');
    element(by.model('sithCtrl.newSith.weaponPreference')).sendKeys('cake');
    element(by.model('sithCtrl.newSith.lightsaberColor')).sendKeys('funfetti');
    element(by.model('sithCtrl.newSith.catchphrase')).sendKeys('cake is not a lie');
    element(by.model('sithCtrl.newSith.handCount')).sendKeys('2');
    element(by.css('.create-sith')).click();
    element(by.css('.sithList li:last-child p')).getText((text) => {
      expect(text).toEqual('totally not a jedi is a newb who uses a cake. Their lightsaber is ' +
       'funfetti and their catchphrase is cake is not a lie with 2 hands.');
    });
  });

  it('should check for a list of sith, and the last one that was created in the test', () => {
    browser.get('http://localhost:5000');
    element(by.css('.sithList li:last-child p')).getText().then((text) => {
      expect(text).toEqual('totally not a jedi is a newb who uses a cake. Their lightsaber is ' +
       'funfetti and their catchphrase is cake is not a lie with 2 hands.');
    });
  });

  it('should not update from the cancel button', () => {
    browser.get('http://localhost:5000');
    element(by.css('.sithList li:last-child .edit-sith')).click();
    element(by.model('sith.name')).clear().sendKeys('some new sith');
    element(by.model('sith.ranking')).clear().sendKeys('higher ranking newb');
    element(by.model('sith.weaponPreference')).clear().sendKeys('words');
    element(by.model('sith.lightsaberColor')).clear().sendKeys('invisible');
    element(by.model('sith.catchphrase')).clear().sendKeys('meh');
    element(by.model('sith.handCount')).clear().sendKeys('4');
    element(by.css('.sithList li:last-child .cancel-sith')).click();
    element(by.css('.sithList li:last-child p')).getText().then((text) => {
      expect(text).toEqual('totally not a jedi is a newb who uses a cake. Their lightsaber is ' +
       'funfetti and their catchphrase is cake is not a lie with 2 hands.');
    });
  });

  it('should update the last sith in the list', () => {
    browser.get('http://localhost:5000');
    element(by.css('.sithList li:last-child .edit-sith')).click();
    element(by.model('sith.name')).clear().sendKeys('a new new sith');
    element(by.model('sith.ranking')).clear().sendKeys('even more newb');
    element(by.model('sith.weaponPreference')).clear().sendKeys('new table');
    element(by.model('sith.lightsaberColor')).clear().sendKeys('brown');
    element(by.model('sith.catchphrase')).clear().sendKeys('i am table');
    element(by.model('sith.handCount')).clear().sendKeys('4');
    element(by.css('.sithList li:last-child .update-sith')).click();
    element(by.css('.sithList li:last-child p')).getText().then((text) => {
      expect(text).toEqual('a new new sith is a even more newb who uses a new table. ' +
      'Their lightsaber is brown and their catchphrase is i am table with 4 hands.');
    });
  });

  it('should delete the test sith', () => {
    browser.get('http://localhost:5000');
    element(by.css('.sithList li:last-child .remove-sith')).click();
    element(by.css('.sithList li:last-child p')).getText().then((text) => {
      expect(text).toEqual('a new new sith is a even more newb who uses a new table. ' +
      'Their lightsaber is brown and their catchphrase is i am table with 4 hands.');
      });
  });
});
