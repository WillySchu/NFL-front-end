angular.module('app')
  .controller('Login', Login)

Login.$inject = ['$state', 'Auth']

function Login($state, Auth) {
  const vm = this;

  vm.title = 'Login';

  vm.submit = function(form) {
    vm.error = false;
    vm.disabled = true;

    Auth.login(vm.loginForm)
      .then(function() {
        $state.go('main');
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
