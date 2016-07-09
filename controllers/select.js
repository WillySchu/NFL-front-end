angular.module('app')
  .controller('Select', Select)

Main.$inject = ['$mdSidenav', 'Prediction'];

function Select($mdSidenav, Prediction) {
  var vm = this;

  vm.features = {};

  teams = {
    'MIN': 31, 'MIA': 11, 'CAR': 13, 'ATL': 29, 'DET': 18, 'CIN': 23, 'NYJ': 6, 'DEN': 25, 'BAL': 24, 'NYG': 27, 'OAK': 22, 'TEN': 20, 'NO': 17, 'DAL': 26, 'NE': 1, 'SEA': 14, 'CLE': 7, 'TB': 21, 'PIT': 0, 'LA': 15, 'CHI': 2, 'HOU': 5, 'GB': 3, 'WAS': 10, 'JAC': 12, 'KC': 4, 'PHI': 28, 'BUF': 9, 'IND': 8, 'ARI': 16, 'SF': 30, 'SD': 19
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
    if (vm.winning === 'md-warn') {
      vm.features.ScoreDiff = vm.score * -1;
    } else if (vm.winning === '') {
      vm.features.ScoreDiff = 0;
    } else {
      vm.features.ScoreDiff = vm.score;
    }
    vm.features.TimeSecs = parseInt(vm.timeleft) * 60 + parseInt(vm.quarter) * 900;



    console.log(vm.features);

    Prediction.submit(vm.features, 'pred/simple').then(function(data) {
      console.log(data);
    })

  }
}
