
"use strict"
  app.controller('createsensorhubcontroller',['$scope','$http','$state','$cookies',function ($scope, $http, $state, $cookies){

	  $scope.imageId = "ami-5ee7443e";
	  $scope.hideCart = true;
	  $scope.sensorType='Temperature Sensor';
	  var addsensors= [{type: 'Temperature Sensor', count: 0},{type: 'Pressure Sensor', count: 0},{type: 'Salinity Sensor', count: 0},{type: 'Oxygen Sensor', count: 0} ];
	  $scope.sensorhubname = "";
      $scope.resultsDetails = true;

      $scope.addSensor = function(){
      	$scope.hideCart = false;
          for (var i = 0; i < addsensors.length; i++) {
              if (addsensors[i].type == $scope.sensorType) {
                  addsensors[i].count++;
                  break;
              }
          }

          $scope.sensorList = addsensors;
      };
      
      $scope.addSensorHub = function(){
      	console.log($scope.imageId);
          $http.post(
              'http://localhost:5000/api/v1/createSensorHub',
              {
                  sensorhubname: $scope.sensorhubname,
                  addsensors: JSON.stringify($scope.sensorList),
				  imageId: $scope.imageId,
                  username: $cookies.get('username')
              },
              { cors: true }
          )
              .success(function(data){
                  var result = JSON.parse(JSON.stringify(data));
                  console.log(result.statusCode);
                  console.log(result.instanceDetails);
                  $scope.sensors = result.instanceDetails;
                  $scope.resultsDetails = false;

              })
              .error(function(error){
                  console.log('error')
              });

    	  //$state.go('profile');
      }
      
  }]);


