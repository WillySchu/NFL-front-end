angular.module('app')
  .controller('Select', Select)

Main.$inject = ['$mdSidenav'];

function Select($mdSidenav) {
  var vm = this;

  vm.toggle = function() {
    $mdSidenav('sidenav')
          .toggle()
  }

  vm.close = function() {
    $mdSidenav('sidenav').close()
  }
}
