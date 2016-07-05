angular.module('app')
  .controller('Register', Register)

Register.$inject = ['$state', 'Auth']

function Register($state, Auth) {
  const vm = this;

  vm.title = 'Register';

  vm.submit = function() {
    vm.error = false;
    vm.disabled = true;

    Auth.register(vm.loginForm).then(function() {
      $state.go('main')
      vm.disabled = false;
      vm.registerForm = {};
    }).catch(function() {
      vm.error = true;
      vm.errorMessage = 'Email must be unique';
      vm.disabled = false;
      vm.registerForm = {};
    })
  }
}
