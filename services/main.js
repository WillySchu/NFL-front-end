angular.module('app')
  .factory('Prediction', Prediction)

Prediction.$inject = ['$http']

function Prediction($http) {
  const devUrl = 'http://0.0.0.0:5000/api/';
  const stageUrl = 'https://nfl-playbyplay-stage.herokuapp.com/api/';
  const proUrl = 'https://nfl-playbyplay-pro.herokuapp.com/api/';
  return {
    submit: function(features, ext) {
      return $http.post(devUrl + ext, features).then(function(data) {
        return data.data;
      })
    }
  }
}
