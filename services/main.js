angular.module('app')
  .factory('Prediction', function($http) {
    const baseUrl = 'http://0.0.0.0:5000/'
    return {
      submit: function(features) {
        return $http.post(baseUrl, features).then(function(data) {
          return data.data
        })
      }
    }
  })
