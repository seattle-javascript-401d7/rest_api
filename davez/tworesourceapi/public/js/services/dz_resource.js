module.exports = function(app) {
  app.factory('dzResource', ['$http', 'dzHandleError', function($http, dzError) {
    var original = {};
    var Resource = function(resourceArray, errorsArray, baseUrl, customErrors) {
      this.data = resourceArray;
      this.errors = errorsArray;
      this.url = baseUrl;
      this.customErrors = customErrors || {};
      this.customErrors.message = this.customErrors.message || {};
    };
    Resource.prototype.getAll = function() {
      return $http.get(this.url)
      .then((res) => {
        this.data.splice(0);
        for(var i = 0; i < res.data.length; i++) {
          this.data.push(res.data[i]);
        };
      }, dzError(this.errors, this.customErrors.message.getAll || 'could not fetch resource'))
    };
    Resource.prototype.create = function(resource) {
      return $http.post(this.url, resource)
      .then((res) => {
        this.data.push(res.data);
      }, dzError(this.errors, this.customErrors.message.create || 'could not save resource'));
    };
    Resource.prototype.update = function(resource) {
      return $http.put(this.url + '/' + resource._id, resource)
      .catch(dzError(this.errors, this.customErrors.message.update || 'could not update resource'));
    };
    Resource.prototype.edit = function(resource) {
      resource.editing = true;
      original.name = resource.name;
      original.artist = resource.artist;
      original.album = resource.album;
      original.year = resource.year;
      original.genre = resource.genre;
      original.personalRating = resource.personalRating;
      original.emotion = resource.emotion;
      original.genre = resource.genre;
      original.rating = resource.rating;
      original.runTime = resource.runTime;
    };
    Resource.prototype.cancel = function(resource) {
      resource.name = original.name;
      resource.artist = original.artist;
      resource.album = original.album;
      resource.year = original.year;
      resource.genre = original.genre;
      resource.personalRating = original.personalRating;
      resource.emotion = original.emotion;
      resource.genre = original.genre;
      resource.rating = original.rating;
      resource.runTime = original.runTime;
      resource.editing = false;
    };
    Resource.prototype.remove = function(resource) {
      return $http.delete(this.url + '/' + resource._id)
      .then(() => {
        this.data.splice(this.data.indexOf(resource), 1);
      }, dzError(this.errors, this.customErrors.message.remove || 'could not delete resource'));
    };
    return Resource;
  }]);
};
