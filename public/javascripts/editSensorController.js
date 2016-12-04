
"use strict"
app.controller('editSensorController',['$scope','$http','$state','$cookies',function ($scope,$http,$state,$cookies){
    $scope.hidemessage = true;
    $scope.getSensorDetails = function () {
        $http.post(
            'http://localhost:5000/api/v1/getSensorDetails',
            {
                'username' : $cookies.get('username')
            },
            { cors: true }
        ).success(function(data){
            var result = JSON.parse(JSON.stringify(data));
            if(result.statusCode == 200){
                $scope.sensorlist = result.sensorInfo;
            }
        })
            .error(function(error){
                console.log('error')
            })
    };

    $scope.editSensor = function (sensorType,region,charges) {
        $scope.hidemessage = true;
        $http.post(
            'http://localhost:5000/api/v1/editSensor',
            {
                'sensorType' : sensorType,
                'region' : region,
                'charges' : charges
            },
            { cors: true }
        ).success(function(data){
            var result = JSON.parse(JSON.stringify(data));
            if(result.statusCode == 200){
                $scope.hidemessage = false;
                $scope.displaymessage = "Charges modified to " + charges + "$/hr for Sensor type " + sensorType + " and Region " + region;
            }
        })
            .error(function(error){
                console.log('error')
            })
    };

}])