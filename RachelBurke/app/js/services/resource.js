module.exports = function(app) {
  app.factory('resource', ['$http', 'totalErrorHandle', function($http, totalErrorHandle) {
    var Resource = function(resourceArray, errorArray, url) {
      this.data = resourceArray;
      this.url = url;
      this.errors = errorArray;
    };
    Resource.prototype.getAll = function() {
      return $http.get(this.url)
      .then((res) => {
        this.data.splice(0);
        for (var i = 0; i < res.data.length; i++) {
          this.data.push(res.data[i]);
        }
      }, totalErrorHandle(this.errors, 'could not fetch resource'));
    };
    Resource.prototype.create = function(resource) {
      return $http.post(this.url, resource)
        .then((res) => {
          this.data.push(res.data);
        }, totalErrorHandle(this.errors, 'could not create and save a new instance of resource'));
    };
    Resource.prototype.removeResource = function(resource) {
      return $http.delete(this.url + '/' + resource._id)
        .then(() => {
          this.data.splice(this.data.indexOf(resource), 1);
        }, totalErrorHandle(this.errors, 'could not delete an instance of the resource'));
    };
    Resource.prototype.update = function(resource) {
      return $http.put(this.url + '/' + resource._id, resource)
          .catch(totalErrorHandle(this.errors, 'could not update the resource'));
    };
    return Resource;
  }]);
};
