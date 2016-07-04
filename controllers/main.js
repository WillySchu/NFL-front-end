angular.module('app')
  .controller('Main', Main)

Main.$inject = ['Prediction', '$state']

function Main(Prediction, $state) {
  const vm = this;

  vm.submit = function(features) {
    Prediction.submit(features).then(function(result) {
      vm.result = JSON.parse(result);
      fResult = [
        {name: 'Pass', size: 0, children: []},
        {name: 'Run', size: 0, children: []}
      ]

      names = ['Pass', 'Pass, Short Right', 'Pass, Short Middle', 'Pass, Short Left', 'Pass, Deep Right', 'Pass, Deep Middle', 'Pass, Deep Left', 'Pass, Sack', 'Run', 'Run, Right End', 'Run, Right Tackle', 'Run, Right Guard', 'Run, Middle', 'Run, Left Guard', 'Run, Left Tackle', 'Run, Left End', 'Punt', 'Field Goal', 'Run, QB Kneel']

      for (i in vm.result) {
        var plays = {'name': names.shift(), 'size': vm.result[i]}

        plays.size = Math.round(plays.size * 10000) / 100;

        if (plays.name.slice(0, 4) == 'Pass'){
          fResult[0].size += plays.size;
          fResult[0].children.push(plays);
        } else if (plays.name.slice(0, 3) == 'Run') {
          fResult[1].size += plays.size;
          fResult[1].children.push(plays);
        } else {
          fResult.push(plays);
        }
      }

      vm.data = [{
        name: 'Plays',
        children: fResult
      }]

      $state.go('main.result');
    })
  }

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
