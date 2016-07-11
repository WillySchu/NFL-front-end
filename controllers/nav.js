angular.module('app')
  .controller('Nav', Nav)

Nav.$inject = ['$timeout', '$state', 'Auth'];

function Nav($timeout, $state, Auth) {
  const vm = this;
  vm.loginForm = {};
  vm.displayLogin = false;
  vm.displayLoginButton = true;
  vm.toggleButton = 'login';

  vm.isUser = Auth.isLoggedIn();

  vm.toggleLogin = function() {
    vm.displayLogin = !vm.displayLogin;

    if (vm.toggleButton === 'login') {
      vm.toggleButton = 'close';
    } else {
      vm.toggleButton = 'login';
    }

    if (vm.displayLoginButton === false) {
      $timeout(function(){
        vm.displayLoginButton = true;
      }, 500);
    } else {
      vm.displayLoginButton = false;
    }
  }

  vm.login = function(form) {
    console.log(form);
  }

  vm.logout = function() {
    Auth.logout().then(function() {
      nav.isUser = false;
      $state.go('main');
    })
  }
}
