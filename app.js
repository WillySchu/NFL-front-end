angular.module('app', ['ui.router', 'nvd3', 'ngMaterial', 'ngMessages', 'ngAnimate'])
  .run(function ($rootScope, $state, Auth) {
    $rootScope.$on('$stateChangeStart', function (event, next, current) {
      Auth.getUserStatus().then(function() {
        if (next.restricted && AuthService.isLoggedIn() === false) {
          $state.go('login');
        }
      })
    });
  });
