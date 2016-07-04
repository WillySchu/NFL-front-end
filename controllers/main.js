angular.module('app')
  .controller('Main', Main)

Main.$inject = ['Prediction', '$state']

function Main(Prediction, $state) {
  const vm = this;

  vm.submit = function(features) {
    Prediction.submit(features).then(function(result) {
      vm.result = JSON.parse(result);
      fResult = []
      names = ['Pass', 'Run', 'Punt', 'Field Goal']

      for (i in vm.result) {
        vm.result[i]

        fResult.push({'name': names.shift(), 'size': vm.result[i]})
      }

      vm.data = [{
        name: 'chart',
        children: fResult
      }]

      $state.go('main.result');
    })
  }

  console.log(d3);

  vm.options = {
    chart: {
      type: 'sunburstChart',
      height: 450,
      color: d3.scale.category10(),
      duration: 250,
      mode: 'size'
    }
  }
}
