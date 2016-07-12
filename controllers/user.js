angular.module('app')
  .controller('User', User)

User.$inject = ['Auth']

function User(Auth) {
  var vm = this;
}
