
"use strict"
  app.controller('createsensorcontroller',['$scope','$http','$state','$cookies',function ($scope, $http, $state, $cookies){
      $scope.addSensorToHub = function(){
    	  alert('Value ' + $scope.sensorname);
      $http.post(
                  'http://localhost:5000/api/v1/validate',
                  {
                      sensorname: $scope.sensorname
                  },
                  { cors: true }
              )
              .success(function(data){
            	  alert('Entered');
             if(data.statusCode == 200)
                  {
                      $state.go('createSensorHub');
                 }
                  else
                  {

                  }
              })
              .error(function(error){
                    console.log('error')
              })
      
      }
      
      $scope.cancel = function(){
    	  $state.go('createSensorHub');
      }
      
  }]);