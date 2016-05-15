describe('all the movies', function() {
  var lastMovie = element(by.css('#movielist:last-child > li:last-of-type'))
  var updateInput = element(by.css('#movielist:last-child > li:last-of-type > form > input:first-of-type'));
  var updateSubmit = element(by.css('#movielist:last-child > li:last-of-type > form > #proUpdate'));

  it('should show movies in browser', function(done) {
    browser.get('http://localhost:8888');
    expect(lastMovie.getText()).toContain(':');
    done();
  });
  it('should create a movie', function(done) {
    browser.get('http://localhost:8888');
    element(by.model('mvctrl.newMovie.name')).sendKeys('test movie');
    element(by.id('createmovie')).click();

    expect(lastMovie.getText()).toContain('test movie');
    expect(true).toEqual(true);
    done();
  });
  it('should update a movie', function(done) {
    browser.get('http://localhost:8888');
    element.all(by.css('#movielist:last-child > li:last-of-type > div > button:last-of-type')).click();
    updateInput.sendKeys('updated movie');
    updateSubmit.click();
    expect(lastMovie.getText()).toContain('updated movie');
    done();
  });
  it('should delete a movie', function(done) {
    browser.get('http://localhost:8888');
    element.all(by.css('#movielist:last-child > li:last-of-type > div > button:first-of-type')).click();
     expect(lastMovie.getText()).not.toContain('test movie');
    done();
  });
});
