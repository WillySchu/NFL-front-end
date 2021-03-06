angular.module('app')
  .controller('Main', Main)

Main.$inject = ['Prediction', '$state', '$scope']

function Main(Prediction, $state, $scope) {
  const vm = this;

  vm.teams = {
    'MIN': 31, 'MIA': 11, 'CAR': 13, 'ATL': 29, 'DET': 18, 'CIN': 23, 'NYJ': 6, 'DEN': 25, 'BAL': 24, 'NYG': 27, 'OAK': 22, 'TEN': 20, 'NO': 17, 'DAL': 26, 'NE': 1, 'SEA': 14, 'CLE': 7, 'TB': 21, 'PIT': 0, 'LA': 15, 'CHI': 2, 'HOU': 5, 'GB': 3, 'WAS': 10, 'JAC': 12, 'KC': 4, 'PHI': 28, 'BUF': 9, 'IND': 8, 'ARI': 16, 'SF': 30, 'SD': 19
  }

  vm.submitComplex = function(features) {
    Prediction.submit(features, 'pred/complex').then(function(result) {
      vm.result = JSON.parse(result);
      var fResult = [
        {name: 'Pass', size: 0, children: []},
        {name: 'Run', size: 0, children: []}
      ]

      var names = ['Pass', 'Pass, Short Right', 'Pass, Short Middle', 'Pass, Short Left', 'Pass, Deep Right', 'Pass, Deep Middle', 'Pass, Deep Left', 'Pass, Sack', 'Run', 'Run, Right End', 'Run, Right Tackle', 'Run, Right Guard', 'Run, Middle', 'Run, Left Guard', 'Run, Left Tackle', 'Run, Left End', 'Punt', 'Field Goal', 'Run, QB Kneel']

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

      vm.options = {
        chart: {
          type: 'sunburstChart',
          height: 450,
          color: d3.scale.category10(),
          duration: 250,
          mode: 'size'
        }
      }

      if (vm.api) {
        vm.api.refresh();
      }

      $state.go('main.select.result');
    })
  }

  vm.submitSimple = function(features) {
    Prediction.submit(features, 'pred/simple').then(function(result) {
      vm.result = JSON.parse(result);
      var fResult = []

      names = ['Pass', 'Run', 'Punt', 'Field Goal'];

      for (i in vm.result) {
        fResult.push({key: names[i], y: vm.result[i]})
      }

      vm.data = fResult;

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

      if (vm.api) {
        vm.api.refresh();
      }

      $state.go('main.select.result');
    })
  }

  vm.success = function(features) {
    return Prediction.submit(features, 'success').then(function(result) {
      return result;
    })
  }

  vm.simpleSuccessAll = function(features) {
    var psbl = []
    for (var i = 0; i < 4; i++) {
      features['play'] = i;
      psbl.push(JSON.parse(JSON.stringify(features)));
    }

    var pResults = psbl.map(vm.success)

    vm.sData = [{
      key: 'Success',
      color: '#0f0',
      values: []
    },
    {
      key: 'Failure',
      color: '#f00',
      values: []
    }]

    names = ['Pass', 'Run', 'Punt', 'Field Goal'];

    Promise.all(pResults).then(function(results) {
      for (i in results) {
        var res = JSON.parse(results[i]);
        vm.sData[0].values.push({
          x: names[i],
          y: res[0] * vm.data[i].y
        });
        vm.sData[1].values.push({
          x: names[i],
          y: res[1] * vm.data[i].y
        });
      }

      vm.options = {
        chart: {
          type: 'multiBarChart',
          height: 450,
          margin : {
            top: 20,
            right: 20,
            bottom: 60,
            left: 45
          },
          clipEdge: true,
          staggerLabels: true,
          transitionDuration: 1000,
          tooltips: true,
          tooltipContent: function (key, x, y, e, graph) {
            return '<p>' + key + ': ' + y + '</p>';
          },
          stacked: true,
          showControls: false,
          xAxis: {
            axisLabel: 'Time',
            showMaxMin: true,
            tickFormat: function(d) {return d;}
          },
          yAxis: {
            axisLabel: 'Number of emails',
            axisLabelDistance: 100,
            tickFormat: function(d){
              return d3.format(',.f')(d);
            }
          }
        }
      }
      $state.go('main.select.result.success');
    })


  }

  vm.complexSuccessAll = function(features) {
    var psbl = []

    var plays = [0, 1, 2, 3, 4, 5, 6, 7, 10, 11, 12, 13, 14, 15, 16, 17, 20, 30, 40]

    for (var i = 0; i < plays.length; i++) {
      features['play'] = plays[i];
      psbl.push(JSON.parse(JSON.stringify(features)));
    }

    var pResults = psbl.map(vm.success)

    vm.sData = [{
      key: 'Success',
      color: '#0f0',
      values: []
    },
    {
      key: 'Failure',
      color: '#f00',
      values: []
    }]

    names = ['Pass', 'Pass, Short Right', 'Pass, Short Middle', 'Pass, Short Left', 'Pass, Deep Right', 'Pass, Deep Middle', 'Pass, Deep Left', 'Pass, Sack', 'Run', 'Run, Right End', 'Run, Right Tackle', 'Run, Right Guard', 'Run, Middle', 'Run, Left Guard', 'Run, Left Tackle', 'Run, Left End', 'Punt', 'Field Goal', 'Run, QB Kneel']

    Promise.all(pResults).then(function(results) {
      for (i in results) {
        var scale = 0;
        var res = JSON.parse(results[i]);
        var d = vm.data[0].children;

        if (names[i].slice(0, 4) === 'Pass') {
          p = d[0].children.filter(function(play) {
            return play.name === names[i];
          })
          scale = p[0].size;
        } else if (names[i].slice(0, 3) === 'Run') {
          p = d[1].children.filter(function(play) {
            return play.name === names[i];
          })
          scale = p[0].size;
        } else if (names[i] === 'Punt') {
          scale = d[2].size;
        } else {
          scale = d[3].size;
        }

        vm.sData[0].values.push({
          x: names[i],
          y: res[0] * scale
        });
        vm.sData[1].values.push({
          x: names[i],
          y: res[1] * scale
        });
      }

      vm.options = {
        chart: {
          type: 'multiBarChart',
          height: 450,
          margin : {
            top: 20,
            right: 20,
            bottom: 60,
            left: 45
          },
          clipEdge: true,
          staggerLabels: true,
          transitionDuration: 1000,
          tooltips: true,
          tooltipContent: function (key, x, y, e, graph) {
            return '<p>' + key + ': ' + y + '</p>';
          },
          stacked: true,
          showControls: false,
          xAxis: {
            axisLabel: 'Time',
            showMaxMin: true,
            tickFormat: function(d) {return d;}
          },
          yAxis: {
            axisLabel: 'Number of emails',
            axisLabelDistance: 100,
            tickFormat: function(d){
              return d3.format(',.f')(d);
            }
          }
        }
      }
      $state.go('main.select.result.success');

    })
  }
}
