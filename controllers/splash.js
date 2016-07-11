angular.module('app')
  .controller('Splash', Splash)

Splash.$inject = ['$state', 'Auth'];

function Splash($state, Auth) {
  var vm = this;

  vm.submit = function(data) {
    vm.error = false;
    vm.disabled = true;

    Auth.login(data)
      .then(function() {
        $state.go('main.select');
        vm.disabled = false;
        vm.loginForm = {};
      })
      .catch(function() {
        vm.error = true;
        vm.errorMessage = 'Invalid username and/or password.';
        vm.disabled = false;
        vm.loginForm = {};
      })
  }
}
