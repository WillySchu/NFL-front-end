angular.module('app')
  .controller('Main', Main)

Main.$inject = ['Prediction', '$state']

function Main(Prediction, $state) {
  const vm = this;

  vm.submit = function(down, ydstogo, ScoreDiff, TimeSecs) {
    Prediction.submit(down, ydstogo, ScoreDiff, TimeSecs).then(function(result) {
      console.log(JSON.parse(result));
      vm.result = JSON.parse(result);
      $state.go('main.result');
    })
  }
}
