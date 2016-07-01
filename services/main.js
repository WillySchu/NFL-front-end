angular.module('app')
  .factory('Prediction', function($http) {
    const devUrl = 'http://0.0.0.0:5000/';
    const stageUrl = 'https://nfl-playbyplay-stage.herokuapp.com/';
    const proUrl = 'https://nfl-playbyplay-pro.herokuapp.com/';
    return {
      submit: function(features) {
        return $http.post(stageUrl, features).then(function(data) {
          return data.data;
        })
      }
    }
  })
