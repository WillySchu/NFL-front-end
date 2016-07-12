angular.module('app')
  .factory('Auth', Auth)

Auth.$inject = ['$window', '$q', '$timeout', '$http']

function Auth($window, $q, $timeout, $http) {
  var user = null;
  const devUrl = 'http://10.5.82.83:5000/api/';
  const stageUrl = 'https://nfl-playbyplay-stage.herokuapp.com/api/';
  const proUrl = 'https://nfl-playbyplay-pro.herokuapp.com/api/';

  return {
    isLoggedIn: isLoggedIn,
    login: login,
    logout: logout,
    register: register,
    getUser: getUser
  }

  function isLoggedIn() {
    if (user) {
      return true;
    } else {
      return false;
    }
  }

  function getUser() {
    return user;
  }

  function login(info) {
    const deferred = $q.defer();

    $http.post(devUrl + 'login', info)
      .then(function(data) {
        console.log(data);
        if (data.status === 200 && data.data) {
          user = data.data;
          $window.sessionStorage.token = user.token;
          delete user.token;
          console.log(user);
          deferred.resolve();
        } else {
          deferred.reject();
        }
      })
      .catch(function(data) {
        user = null;
        delete $window.sessionStorage.token;
        deferred.reject();
      })
    return deferred.promise;
  }

  function logout() {
    const deferred = $q.defer();

    $http.get(devUrl + 'logout')
      .then(function(data) {
        user = null;
        delete $window.sessionStorage.token;
        deferred.resolve();
      })
      .catch(function(data) {
        user = null;
        delete $window.sessionStorage.token;
        deferred.reject();
      })
    return deferred.promise;
  }

  function register(info) {
    const deferred = $q.defer();

    $http.post(devUrl + 'register', info)
      .then(function(data) {
        console.log(data);
        if (data.status === 200 && data.data.result) {
          deferred.resolve();
        } else {
          deferred.reject();
        }
      })
      .catch(function(data) {
        deferred.reject();
      })
    return deferred.promise;
  }
}
