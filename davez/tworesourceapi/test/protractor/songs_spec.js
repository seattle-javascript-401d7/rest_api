describe('all the songs', function() {
  var lastSong = element(by.css('#songlist:last-child > li:last-of-type'))
  var updateInput = element(by.css('#songlist:last-child > li:last-of-type > form > input:first-of-type'));
  var updateSubmit = element(by.css('#songlist:last-child > li:last-of-type > form > #proUpdateSong'));

  it('should show songs in browser', function(done) {
    browser.get('http://localhost:8888');
    expect(lastSong.getText()).toContain(':');
    done();
  });
  it('should create a song', function(done) {
    browser.get('http://localhost:8888');
    element(by.model('sngctrl.newSong.name')).sendKeys('test song');
    element(by.id('createsong')).click();

    expect(lastSong.getText()).toContain('test song');
    expect(true).toEqual(true);
    done();
  });
  it('should update a song', function(done) {
    browser.get('http://localhost:8888');
    element.all(by.css('#songlist:last-child > li:last-of-type > div > button:last-of-type')).click();
    updateInput.sendKeys('updated song');
    updateSubmit.click();
    expect(lastSong.getText()).toContain('updated song');
    done();
  });
  it('should delete a song', function(done) {
    browser.get('http://localhost:8888');
    element.all(by.css('#songlist:last-child > li:last-of-type > div > button:first-of-type')).click();
     expect(lastSong.getText()).not.toContain('test song');
    done();
  });
});
