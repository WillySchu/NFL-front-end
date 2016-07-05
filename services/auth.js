angular.module('app')
  .factory('Auth', Auth)

Auth.$inject = ['$q', '$timeout', '$http']


function Auth($q, $timeout, $http) {
  const user = null;
  const devUrl = 'http://0.0.0.0:5000/';
  const stageUrl = 'https://nfl-playbyplay-stage.herokuapp.com/';
  const proUrl = 'https://nfl-playbyplay-pro.herokuapp.com/';

  return {
    isLoggedIn: isLoggedIn,
    login: login,
    logout: logout,
    register: register
  }

  function isLoggedIn() {
    if (user) {
      return true;
    } else {
      return false;
    }
  }

  function login(email, password) {
    const deferred = $q.defer();

    $http.post(devUrl + '/login', {email, password})
      .sucess(function(data, status) {
        if (status === 200 && data.result) {
          user = true;
          deferred.resolve();
        } else {
          user = false;
          deferred.reject();
        }
      })
      .error(function(data) {
        user = false;
        deferred.reject();
      })
    return deferred.promise;
  }

  function logout() {
    const deferred = $q.defer();

    $http.get(devUrl + '/logout')
      .success(function(data) {
        user = false;
        deferred.resolve();
      })
      .error(function(data) {
        user = false;
        deferred.reject();
      })
    return deferred.promise;
  }

  function register(email, password) {
    const deferred = $q.defer();

    $http.post('/register', {email, password})
      .success(function(data, status) {
        if (status === 200 && data.result) {
          deferred.resolve();
        } else {
          deferred.reject();
        }
      })
      .error(function(data) {
        deferred.reject();
      })
    return deferred.promise;
  }
}
