angular.module('app')
  .controller('Splash', Splash)

Splash.$inject = [];

function Splash() {
  var vm = this;

  vm.submit = function(data) {
    console.log(data);
  }
}
