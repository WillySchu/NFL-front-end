angular.module('app', ['ui.router', 'nvd3', 'ngMaterial'])
  .run(function ($rootScope, $state, Auth) {
    $rootScope.$on('$stateChangeStart', function (event, next, current) {
      if (next.restricted && AuthService.isLoggedIn() === false) {
        $state.go('login');
      }
    });
  });
