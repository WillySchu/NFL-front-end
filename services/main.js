angular.module('app')
  .factory('Prediction', function($http) {
    const baseUrl = 'https://nfl-playbyplay-pro.herokuapp.com/'
    return {
      submit: function(down, ydstogo, ScoreDiff, TimeSecs) {
        return $http.post(baseUrl, {down, ydstogo, ScoreDiff, TimeSecs}).then(function(data) {
          return data.data
        })
      }
    }
  })
