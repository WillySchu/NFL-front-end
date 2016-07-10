angular.module('app')
  .controller('Result', Result)

Result.$inject = [];

function Result() {
  var vm = this;

  console.log('ehll');

  vm.currentNavItem = 'pred';
}
