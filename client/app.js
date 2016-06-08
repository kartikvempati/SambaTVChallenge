angular.module('app', ['ngRoute'])

.controller('Login', function ($scope, redirect) {
  $scope.username = "";
  $scope.password = "";
  $scope.msg1 = "You must supply a username";
  $scope.msg2 = "You must supply a password";
  $scope.msg3 = "Username and Password do not match. If you are a new user, that username is already taken"
  $scope.submit = function () {
    $scope.error1 = false;
    $scope.error2 = false;
    $scope.error3 = false;
    if ($scope.username.length === 0) {
      $scope.error1 = true;
    } else if ($scope.password.length === 0) {
      $scope.error2 = true;
    } else if (window.localStorage[$scope.username]) {
      if($scope.password === window.localStorage[$scope.username]) {
        window.localStorage["LoggedIn"] = $scope.username
        redirect.sendToSplash();
      } else {
        $scope.error3 = true;
      };
    } else {
      window.localStorage[$scope.username] = $scope.password;
      window.localStorage["LoggedIn"] = $scope.username;
      redirect.sendToSplash();
    }
    console.log(window.localStorage)
  }

  $scope.logout = function () {
    delete window.localStorage.LoggedIn
    redirect.sendToLogin();
  }
})

.factory('redirect', function ($http, $location) {
  return {
    sendToSplash: function () {
      $location.path('/splash');
    },

    sendToLogin: function () {
      $location.path('/')
    }
  }
})
// I ORIGINALLY WANTED TO USE A BACKEND DATABASE BUT WENT WITH LOCAL STORAGE
// .factory('Database', function ($http, $location) {
//   return {
//     storeInDatabase: function(username, password) {
//       return $http({
//         method: 'POST',
//         url: '/storeuser',
//         data: {username, password}
//       })
//     }
//   }
// })
.config( function ($routeProvider) {

  // Function to help the routeProvider resolve whether a user is logged in or not
  var loggedInUser = function ($q, $location) {
      var deferred = $q.defer();

      if (localStorage.LoggedIn) {
        console.log("in the auth")
        deferred.resolve();
      } else {
        deferred.reject();
        $location.url('/login')
      }
      return deferred.promise;
    };

  $routeProvider
    .when("/splash", {
        templateUrl: "splash.html",
        controller: "Login",
        resolve:  {
          loggedin: loggedInUser
        }
      })
    .when("/", {
      templateUrl: "login.html",
      controller: "Login"
    })
    .otherwise({
      redirectTo: '/'
    })
});
