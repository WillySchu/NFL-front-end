angular.module('app')
  .controller('Nav', Nav)

Nav.$inject = ['$state', 'Auth'];

function Nav($state, Auth) {
  const vm = this;

  vm.isUser = Auth.isLoggedIn();

  vm.signIn = function() {
    $state.go('login');
  }

  vm.logout = function() {
    Auth.logout().then(function() {
      nav.isUser = false;
      $state.go('main');
    })
  }
}
