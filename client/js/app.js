var app = angular.module('restAppClient', ['ngRoute']);

app.config(function($routeProvider, $httpProvider) {
  $httpProvider.interceptors.push('TokenInterceptor');

  $routeProvider
    .when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'LoginCtrl',
      access: {
        requiredLogin: false
      }
    })
    .when('/', {
      templateUrl: 'partials/home.html',
      controller: 'HomeCtrl',
      access: {
        requiredLogin: true
      }
    })
    .when('/page1', {
      templateUrl: 'partials/page1.html',
      controller: 'Page1Ctrl',
      access: {
        requiredLogin: true
      }
    })
    .when('/page2', {
      templateUrl: 'partials/page2.html',
      controller: 'Page2Ctrl',
      access: {
        requiredLogin: true
      }
    })
    .when('/page3', {
      templateUrl: 'partials/page3.html',
      controller: 'Page3Ctrl',
      access: {
        requiredLogin: true
      }
    })
    .otherwise({
      redirectTo: '/login'
    });
});

app.run(function($rootScope, $window, $location, AuthFactory) {
  // when the page refreshes, check if the user is already logged interceptors
  AuthFactory.check();

  $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
    if ((nextRoute.access && nextRoute.access.requiredLogin) && !AuthFactory.isLogged) {
      $location.path('/login');
    } else {
      // check if user object exists else fetch it, this is incase of a page refreshes
      if (!AuthFactory.user) AuthFactory.user = $window.sessionStorage.user;
      if (!AuthFactory.userRole) AuthFactory.userRole = $window.sessionStorage.userRole;
    }
  });

  $rootScope.$on('$routeChangeSuccess', function(event, nextRoute, currentRoute) {
    $rootScope.showMenu = AuthFactory.isLogged;
    $rootScope.role = AuthFactory.userRole;

    // if the user is already logged in, take him to the home page
    if (AuthFactory.isLogged == true && $location.path() == '/login') {
      $location.path('/');
    }
  });
});