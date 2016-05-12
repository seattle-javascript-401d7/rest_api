const angular = require('angular');

const crudNG = angular.module('crudNG', []);
const baseUrl = 'http://localhost:3030';

const handleError = require('../../lib/error_handler');

crudNG.controller('ShoesController', ['$http', function($http) {
    this.shoes = [];
    this.getAll = () => {
        $http.get(baseUrl + '/api/shoes')
            .then((res) => {
                this.shoes = res.data;
            }, handleError.bind(this));
    };

}])
