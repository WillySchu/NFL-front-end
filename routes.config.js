angular.module('app')
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/')

    $stateProvider
      .state('splash', {
        url: '/',
        views: {
          content: {
            templateUrl: 'partials/splash.html',
            controller: 'Splash',
            controllerAs: 'splash'
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
            templateUrl: 'partials/main.html'
          }
        }
      })
      .state('main.select', {
        url: 'select/',
        views: {
          'main@main': {
            templateUrl: 'partials/select.html',
            controller: 'Select',
            controllerAs: 'select'
          }
        }
      })
      .state('main.select.result', {
        url: 'result/',
        views: {
          'result@main.select': {
            templateUrl: 'partials/result.html',
            controller: 'Result',
            controllerAs: 'result'
          }
        }
      })
      .state('main.select.result.pred', {
        url: 'prediction/',
        views: {
          'pred@main.select.result': {
            templateUrl: 'partials/pred.html'
          }
        }
      })
      .state('main.select.result.succ', {
        url: 'success/',
        views: {
          'pred@main.select.result': {
            templateUrl: 'partials/succ.html'
          }
        }
      })
      .state('main.register', {
        url: 'register/',
        views: {
          'content': {
            templateUrl: 'partials/login.html',
            controller: 'Register',
            controllerAs: 'login'
          }
        }
      })
  })
