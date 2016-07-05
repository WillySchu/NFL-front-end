angular.module('app')
  .factory('Prediction', Prediction)

Prediction.$inject = ['$http']

function Prediction($http) {
  const devUrl = 'http://0.0.0.0:5000/';
  const stageUrl = 'https://nfl-playbyplay-stage.herokuapp.com/';
  const proUrl = 'https://nfl-playbyplay-pro.herokuapp.com/';
  return {
    submit: function(features) {
      return $http.post(devUrl, features).then(function(data) {
        return data.data;
      })
    }
  }
}
