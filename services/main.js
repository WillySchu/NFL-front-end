angular.module('app')
  .factory('Prediction', function($http) {
    const baseUrl = 'http://0.0.0.0:5000/'
    return {
      submit: function(down, ydstogo, ScoreDiff, TimeSecs) {
        return $http.post(baseUrl, {down, ydstogo, ScoreDiff, TimeSecs}).then(function(data) {
          return data.data
        })
      }
    }
  })
