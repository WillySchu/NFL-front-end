angular.module('app')
  .controller('Select', Select)

Main.$inject = ['$state', '$mdSidenav', 'Prediction', 'Graph'];

function Select($state, $mdSidenav, Prediction, Graph) {
  var vm = this;

  function success(features) {
    return Prediction.submit(features, 'success').then(function(result) {
      return result;
    })
  }

  vm.features = {};

  vm.complexity = 'Simple';

  var teams = {
    'MIN': 31, 'MIA': 11, 'CAR': 13, 'ATL': 29, 'DET': 18, 'CIN': 23, 'NYJ': 6, 'DEN': 25, 'BAL': 24, 'NYG': 27, 'OAK': 22, 'TEN': 20, 'NO': 17, 'DAL': 26, 'NE': 1, 'SEA': 14, 'CLE': 7, 'TB': 21, 'PIT': 0, 'LA': 15, 'CHI': 2, 'HOU': 5, 'GB': 3, 'WAS': 10, 'JAC': 12, 'KC': 4, 'PHI': 28, 'BUF': 9, 'IND': 8, 'ARI': 16, 'SF': 30, 'SD': 19
  }

  vm.switch = function() {
    if (vm.complexity === 'Simple') {
      vm.complexity = 'Advanced';
    } else {
      vm.complexity = 'Simple';
    }
  }

  vm.toggle = function() {
    $mdSidenav('sidenav').toggle();
  }

  vm.close = function(team) {
    if (team) {
      vm.team = team;
      vm.features.posteamint = teams[vm.team];
    }

    $mdSidenav('sidenav').close();
  }

  vm.submit = function() {
    vm.loading = true;
    vm.sData = null;
    if (vm.winning === 'md-warn') {
      vm.features.ScoreDiff = vm.score * -1;
    } else if (vm.winning === '') {
      vm.features.ScoreDiff = 0;
    } else {
      vm.features.ScoreDiff = vm.score;
    }
    vm.features.TimeSecs = parseInt(vm.timeleft) * 60 + parseInt(vm.quarter) * 900;

    if (vm.complexity === 'Advanced') {
      var ext = 'pred/complex';
    } else {
      var ext = 'pred/simple';
    }

    Prediction.submit(vm.features, ext).then(function(data) {
      var res = Graph.drawSimple(JSON.parse(data))

      vm.data = res.data;
      vm.options = res.options;

      vm.loading = false;
      $state.go('main.select.result.pred');
    })
  }

  vm.success = function(features) {
    vm.loading = true;

    var psbl = []

    for (var i = 0; i < 4; i++) {
      features['play'] = i;
      psbl.push(JSON.parse(JSON.stringify(features)));
    }

    var pResults = psbl.map(success)

    Promise.all(pResults).then(function(data) {
      var res = Graph.drawSuccess(data, vm.data);

      vm.sData = res.sData;
      vm.sOptions = res.options;

      vm.loading = false;
      $state.go('main.select.result.succ');
    })
  }

  vm.goSuccess = function() {
    if (!vm.sData) {
      vm.success(vm.features);
    }
  }
}
