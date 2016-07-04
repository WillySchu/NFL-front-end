angular.module('app')
  .directive('wsGraph', function(d3Service) {
    return {
      templateUrl: 'directives/graph.html';
    }
  })
