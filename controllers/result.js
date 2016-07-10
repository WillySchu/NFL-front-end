angular.module('app')
  .controller('Result', Result)

Result.$inject = [];

function Result() {
  var vm = this;

  vm.currentNavItem = 'pred';
}
