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

        fResult.push({'key': names.shift(), 'y': vm.result[i]})
      }

      console.log(fResult);

      vm.data = fResult;

      $state.go('main.result');
    })
  }


  vm.options = {
    chart: {
      type: 'pieChart',
      height: 450,
      donut: true,
      x: function(d){return d.key;},
      y: function(d){return d.y;},
      showLabels: true,

      pie: {
        startAngle: function(d) { return d.startAngle/2 -Math.PI/2 },
        endAngle: function(d) { return d.endAngle/2 -Math.PI/2 }
      },
      duration: 500,
      legend: {
        margin: {
          top: 5,
          right: 70,
          bottom: 5,
          left: 0
        }
      }
    }
  }
}
