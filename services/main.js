angular.module('app')
  .factory('Prediction', function($http) {
    const baseUrl = 'http://0.0.0.0:5000/'
    return {
      submit: function(down, ydstogo, yrdline100, ScoreDiff, TimeSecs) {
        return $http.post(baseUrl, {down, ydstogo, yrdline100, ScoreDiff, TimeSecs}).then(function(data) {
          return data.data
        })
      }
    }
  })
