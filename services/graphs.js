angular.module('app')
  .factory('Graph', Graph)

Graph.$inject = [];

function Graph() {
  return {
    drawSimple: function(data) {
      var fResult = []

      names = ['Pass', 'Run', 'Punt', 'Field Goal'];

      for (i in data) {
        fResult.push({key: names[i], y: data[i]})
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
    drawSuccess: function(succData, predData) {
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
    }
  }
}
