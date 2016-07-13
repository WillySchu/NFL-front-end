angular.module('app')
  .factory('Graph', Graph)

Graph.$inject = [];

function Graph() {
  return {
    drawSimple: function(data) {
      var fResult = [];

      names = ['Pass', 'Run', 'Punt', 'Field Goal'];

      for (i in data) {
        fResult.push({key: names[i], y: data[i]});
      }

      options = {
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
              top: 10,
              right: 10,
              bottom: 0,
              left: 0
            }
          }
        }
      }
      return {data: fResult, options};
    },
    drawComplex: function(data) {
      var fResult = [
        {name: 'Pass', size: 0, children: []},
        {name: 'Run', size: 0, children: []}
      ]

      var names = ['Pass', 'Pass, Short Right', 'Pass, Short Middle', 'Pass, Short Left', 'Pass, Deep Right', 'Pass, Deep Middle', 'Pass, Deep Left', 'Pass, Sack', 'Run', 'Run, Right End', 'Run, Right Tackle', 'Run, Right Guard', 'Run, Middle', 'Run, Left Guard', 'Run, Left Tackle', 'Run, Left End', 'Punt', 'Field Goal', 'Run, QB Kneel']

      for (i in data) {
        var plays = {'name': names.shift(), 'size': data[i]}

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

      var result = [{
        name: 'Plays',
        children: fResult
      }]

      var options = {
        chart: {
          type: 'sunburstChart',
          height: 450,
          color: d3.scale.category20(),
          duration: 250,
          mode: 'size'
        }
      }
      return {data: result, options};
    },
    drawSSuccess: function(succData, predData) {
      sData = [{
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

      for (i in succData) {
        var res = JSON.parse(succData[i]);
        sData[0].values.push({
          x: names[i],
          y: res[0] * predData[i].y
        });
        sData[1].values.push({
          x: names[i],
          y: res[1] * predData[i].y
        });
      }

      options = {
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
      return {sData, options};
    },
    drawCSuccess: function(succData, predData) {
      var sData = [{
        key: 'Success',
        color: '#0f0',
        values: []
      },
      {
        key: 'Failure',
        color: '#f00',
        values: []
      }]

      var names = ['Pass', 'Pass, Short Right', 'Pass, Short Middle', 'Pass, Short Left', 'Pass, Deep Right', 'Pass, Deep Middle', 'Pass, Deep Left', 'Pass, Sack', 'Run', 'Run, Right End', 'Run, Right Tackle', 'Run, Right Guard', 'Run, Middle', 'Run, Left Guard', 'Run, Left Tackle', 'Run, Left End', 'Punt', 'Field Goal', 'Run, QB Kneel']

      for (i in succData) {
        var scale = 0;
        var res = JSON.parse(succData[i]);
        var d = predData[0].children;

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

        sData[0].values.push({
          x: names[i],
          y: res[0] * scale
        });
        sData[1].values.push({
          x: names[i],
          y: res[1] * scale
        });
      }

      options = {
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
      return {sData, options};
    }
  }
}
