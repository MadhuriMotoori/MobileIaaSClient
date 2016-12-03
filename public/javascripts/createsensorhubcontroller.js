
"use strict"
  app.controller('createsensorhubcontroller',['$scope','$http','$state','$cookies',function ($scope, $http, $state, $cookies){

	  $scope.imageId = "ami-5ee7443e";
	  $scope.hideCart = true;
	  $scope.sensorType='Temperature Sensor';
	  var addsensors= [{id: 1 , type: 'Temperature Sensor', region: 'NewYork' , count: 0},{id: 2 , type: 'Pressure Sensor', region:'SanJose', count: 0},
          {id:3, type: 'Salinity Sensor', region: 'SantaClara' ,count: 0},{id: 4, type: 'Oxygen Sensor', region:'Seattle' , count: 0} ];
	  $scope.sensorhubname = "";
      $scope.resultsDetails = true;
      $scope.username = $cookies.get('username');
      $scope.sensorList = addsensors;
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


