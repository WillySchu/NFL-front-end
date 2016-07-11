angular.module('app')
  .controller('Nav', Nav)

Nav.$inject = ['$scope', '$timeout', '$state', 'Auth'];

function Nav($scope, $timeout, $state, Auth) {
  const vm = this;
  vm.loginForm = {};
  vm.displayLogin = false;
  vm.displayLoginButton = true;
  vm.displayLogout = false;
  vm.toggleButton = 'login';

  vm.isUser = Auth.isLoggedIn();

  if (vm.isUser) {
    vm.user = Auth.getUser();
  }

  vm.toggleLogin = function() {
    vm.displayLogin = !vm.displayLogin;

    vm.loginForm = {};
    $scope.navForm.$setPristine();

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
    vm.disabled = true;

    Auth.login(form).then(function(data) {
      console.log(data);
      vm.disabled = false;
      vm.loginForm = {};
      vm.displayLogin = false;
      vm.isUser = Auth.isLoggedIn();
      vm.user = Auth.getUser();
      $timeout(function(){
        vm.displayLogout = true;
      }, 500);
    }).catch(function(error) {
      vm.disabled = false;
      vm.loginForm = {};
    })
  }

  vm.logout = function() {
    Auth.logout().then(function() {
      vm.isUser = false;
      vm.displayLogout = false;
      vm.displayLoginButton = true;
    })
  }
}
