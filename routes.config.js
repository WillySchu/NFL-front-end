angular.module('app')
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/')

    $stateProvider
      .state('splash', {
        url: '/',
        views: {
          content: {
            templateUrl: 'partials/splash.html'
          }
        }
      })
      .state('main', {
        url: '/main',
        views: {
          nav: {
            templateUrl: 'partials/nav.html',
            controller: 'Nav',
            controllerAs: 'nav'
          },
          content: {
            templateUrl: 'partials/main.html',
            controller: 'Main',
            controllerAs: 'main'
          }
        }
      })
      .state('main.result', {
        url: '/result',
        views: {
          'result@main': {
            templateUrl: 'partials/result.html'
          }
        }
      })
      .state('main.result.success', {
        url: '/success',
        views: {
          'result@main': {
            templateUrl: 'partials/success.html'
          }
        }
      })
      .state('login', {
        url: '/login',
        views: {
          nav: {
            templateUrl: 'partials/nav.html',
            controller: 'Nav',
            controllerAs: 'nav'
          },
          'content': {
            templateUrl: 'partials/login.html',
            controller: 'Login',
            controllerAs: 'login'
          }
        }
      })
      .state('register', {
        url: '/register',
        views: {
          nav: {
            templateUrl: 'partials/nav.html',
            controller: 'Nav',
            controllerAs: 'nav'
          },
          'content': {
            templateUrl: 'partials/login.html',
            controller: 'Register',
            controllerAs: 'login'
          }
        }
      })
  })
