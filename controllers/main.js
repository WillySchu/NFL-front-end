angular.module('app')
  .controller('Main', Main)

Main.$inject = ['Prediction', '$state']

function Main(Prediction, $state) {
  const vm = this;

  vm.submit = function(down, ydstogo, yrdline100, ScoreDiff, TimeSecs) {
    Prediction.submit(down, ydstogo, yrdline100, ScoreDiff, TimeSecs).then(function(result) {
      vm.result = JSON.parse(result);
      $state.go('main.result');
    })
  }
}
