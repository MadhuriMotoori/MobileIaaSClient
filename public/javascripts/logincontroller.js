
"use strict"
  app.controller('logincontroller',['$scope','$http','$state','$cookies',function ($scope, $http, $state, $cookies){
     // var host = 'http://localhost:5000/';
      var host = 'http://mydbinstance.cmxia5o2lhpo.us-west-2.rds.amazonaws.com:5000/';
      $scope.signIn = function(){
      $http.post(
                  host + 'api/v1/validate',
                  {
                      username: $scope.username,
                      password: $scope.password
                  },
                  { cors: true }
              )
              .success(function(data){
             if(data.statusCode == 200)
                 {
                      $cookies.put('username',$scope.username);
                      $cookies.put('serverHost', host);
                      $state.go('profile',{'test':data.username});
                 }
                  else
                  {
                  }
              })
              .error(function(error){
                    console.log('error')
              })
      }
  }]);