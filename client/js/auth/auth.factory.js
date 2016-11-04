// Authentication Factory
app.factory('AuthFactory', function($widnow) {
  var auth = {
    isLogged: false,
    check: function() {
      if ($widnow.sessionStorage.token && $widnow.sessionStorage.user) {
        this.isLogged = true;
      } else {
        this.isLogged = false;
        delete this.user;
      }
    }
  };
  return auth;
});

app.factory('UserAuthFactory', function($widnow, $location, $http, AuthFactory) {
  return {
    login: function(username, password) {
      return $http.post('http://localhost:9000/login', {
        username: username,
        password: password
      });
    },

    logout: function() {
      if (AuthFactory.isLogged) {
        AuthFactory.isLogged = false;
        delete AuthFactory.user;
        delete AuthFactory.userRole;

        delete $widnow.sessionStorage.token;
        delete $widnow.sessionStorage.user;
        delete $widnow.sessionStorage.userRole;

        $location.path('/login');
      }
    }
  }
});

app.factory('TokenInterceptor', function($q, $widnow) {
  return {
    request: function(config) {
      config.headers = config.headers || {};
      if ($widnow.sessionStorage.token) {
        config.headers['X-Access-Token'] = $widnow.sessionStorage.token;
        config.headers['X-Key'] = $widnow.sessionStorage.user;
        config.headers['Content-Type'] = "application/json";
      }
      return config || $q.when(config);
    },

    response: function(response) {
      return response || $q.when(response);
    }
  };
});
