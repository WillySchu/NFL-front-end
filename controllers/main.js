angular.module('app')
  .controller('Main', Main)

Main.$inject = ['Prediction', '$state']

function Main(Prediction, $state) {
  const vm = this;

  vm.submit = function(features) {
    console.log(features);
    Prediction.submit(features).then(function(result) {
      vm.result = JSON.parse(result);
      $state.go('main.result');
    })
  }
}
