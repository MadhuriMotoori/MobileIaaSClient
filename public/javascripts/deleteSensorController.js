
"use strict"
app.controller('deleteSensorController',['$scope','$http','$state','$cookies',function ($scope,$http,$state,$cookies){
    $scope.hidemessage = true;
    $scope.getSensorDetails = function () {
        $http.post(
            'http://localhost:5000/api/v1/getSensorDetails',
            {
                'username' : $cookies.get('username')
            },
            { cors: true }
        ).success(function(data){
            $scope.hidemessage = true;
                var result = JSON.parse(JSON.stringify(data));
                console.log("Result: " + result.statusCode);
                if(result.statusCode == 200){
                    $scope.sensorlist = result.sensorInfo;
                }
            })
            .error(function(error){
                console.log('error')
            })
    };

    $scope.deleteSensor = function (sensorInfo) {
        $scope.selectedSensor = sensorInfo;
        $scope.hidemessage = true;
    };

    $scope.delSensor = function(sensorType,region) {
        $http.post(
            'http://localhost:5000/api/v1/deleteSensor',
            {
                'sensorType' : sensorType,
                'region' : region
            },
            { cors: true }
        ).success(function(data){
            var result = JSON.parse(JSON.stringify(data));
            console.log("Result: " + result.statusCode);
            if(result.statusCode == 200){
                $scope.hidemessage = false;
                $scope.displaymessage = "Sensor Type " + sensorType + " for region " + region + " deleted successfully";
            }
        })
            .error(function(error){
                console.log('error')
            })
    };

}])