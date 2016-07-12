angular.module('app')
  .controller('Splash', Splash)

Splash.$inject = ['$scope', '$state', 'Auth'];

function Splash($scope, $state, Auth) {
  var vm = this;
  vm.showRegister = false;

  vm.submit = function(data) {
    vm.error = false;
    vm.disabled = true;

    if (data.confirmPassword) {

      if (data.password != data.confirmPassword) {
        vm.error = true;
        vm.errorMessage = 'Passwords must match';
        vm.disabled = false;
        vm.loginForm = {};
      } else {
        delete data.confirmPassword;
        Auth.register(data).then(function() {
          $state.go('main.select')
          vm.disabled = false;
          vm.loginForm = {};
        }).catch(function() {
          vm.error = true;
          vm.disabled = false;
          vm.errorMessage = 'An account with that email already exists';
          vm.loginForm = {};
        })
      }

    } else {
      Auth.login(data)
      .then(function() {
        $state.go('main.select');
        vm.disabled = false;
        vm.loginForm = {};
      })
      .catch(function() {
        vm.error = true;
        vm.disabled = false;
        vm.errorMessage = 'Invalid username and/or password.';
        vm.loginForm = {};
      })
    }
  }

  vm.toggle = function() {
    vm.showRegister = !vm.showRegister;
  }
}
