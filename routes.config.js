angular.module('app')
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/')

    $stateProvider
      .state('splash', {
        url: '/welcome',
        views: {
          content: {
            templateUrl: 'partials/splash.html'
          }
        }
      })
      .state('main', {
        url: '/',
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
      .state('teams', {
        url: '/teams',
        views: {
          'main@main': {
            templateUrl: 'partials/team.html'
          }
        }
      })
      .state('main.select', {
        url: '/select',
        views: {
          'main@main': {
            templateUrl: 'partials/select.html'
          }
        }
      })
      .state('main.select.result', {
        url: '/result',
        views: {
          'result@main.select': {
            templateUrl: 'partials/result.html'
          }
        }
      })
      .state('main.select.result.success', {
        url: '/success',
        views: {
          'result@main.main': {
            templateUrl: 'partials/success.html'
          }
        }
      })
      .state('main.login', {
        url: '/login',
        views: {
          'content': {
            templateUrl: 'partials/login.html',
            controller: 'Login',
            controllerAs: 'login'
          }
        }
      })
      .state('main.register', {
        url: '/register',
        views: {
          'content': {
            templateUrl: 'partials/login.html',
            controller: 'Register',
            controllerAs: 'login'
          }
        }
      })
  })
