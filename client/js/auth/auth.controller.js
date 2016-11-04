app.controller('LoginCtrl', ['$scope', '$window', '$location', 'UserAuthFactory', 'AuthFactory', 
  function($scope, $window, $location, UserAuthFactory, AuthFactory){
    $scope.user = {
      username : 'kangelyu@yourapp.com',
      password : 'password'
    };

    $scope.login = function() {
      var username = $scope.user.username;
      var password = $scope.user.password;

      if (username !== undefined && password !== undefined) {
        UserAuthFactory.login(username, password).success(function(data) {
          AuthFactory.isLogged = true;
          AuthFactory.user = data.user.username;
          AuthFactory.userRole = data.user.role;

          $window.sessionStorage.token = data.token;
          $window.sessionStorage.user = data.user.username;
          $window.sessionStorage.userRole = data.user.role;

          $location.path('/');
        }).error(function(status){
          alert('Oops something went wrong');
        });
      } else {
        alert('Invalid credentials');
      }
    };
}])