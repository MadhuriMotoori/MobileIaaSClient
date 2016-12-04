"use strict"
app.controller('managementController',['$scope','$http','$state','$cookies',function ($scope, $http, $state, $cookies) {
    var host = $cookies.get('serverHost');

    //$scope.imageId = "ami-c074d7a0";
    // $scope.imageId = "ami-c074d7a0";
    $scope.imageId = "ami-5ee7443e";
    /*    $scope.hideSensorList = true;
     $scope.hideSensorHubName = true;
     $scope.hideDate = true;
     $scope.hideMonitoringDetails = true;
     $scope.hideMonitorForm = false;
     $scope.resultsStartDetails = true;
     $scope.resultsStopDetails = true;
     $scope.resultsTerminateDetails = true;*/
    $scope.hideSensorManager = true;
    $scope.hideMonitoringDetails = true;
    $scope.hideGraph = true;
    $scope.hideErrormessage = true;
    $scope.hideGraphDetails = true;
    $scope.hideData =true;

    $scope.getUserSensorDetails = function () {
        $http({
            method : "POST",
            url : '/listuserSensorDetails',
            data : {
                "username" : $cookies.get('username')
            }
        }).success(function(data) {
            // checking the response data for statusCode
            if (data.statusCode == 200) {
                $scope.hideSensorHubName = false;
                $scope.sensorlist = data.sensorlist;
            }
        }).error(function(error) {

        });
    };

    $scope.hideStop = false;
    $scope.hideStart = false;
    $scope.manageSensor = function (sensorInfo) {
        $scope.selectedSensor = sensorInfo;
        if(sensorInfo.Status == "running"){

            $scope.hideStop = false;
            $scope.hideStart = true;
        } else if(sensorInfo.Status == "stopped"){
            $scope.hideStart = false;
            $scope.hideStop = true;
        }
    };

    $scope.chooseSensorHub = function () {
        $http({
            method : "POST",
            url : '/listsensorhub',
            data : {
                "username" : $cookies.get('username')
            }
        }).success(function(data) {
            // checking the response data for statusCode
            if (data.statusCode == 200) {
                $scope.hideSensorHubName = false;
                $scope.hubnamelist = data.hubnamelist;
            }
        }).error(function(error) {

        });
    };

    $scope.getSensorTypeCount = function(){
        $http({
            method : "POST",
            url : '/getSensorTypeCount',
            data : {
                "hubname" : $scope.hubname,
                "sensorType": $scope.sensorType,
                "username" : $cookies.get('username')
            }
        }).success(function(data) {
            // checking the response data for statusCode
            if (data.statusCode == 200) {
                $scope.sensorTypeCount = data.count;
            }
        }).error(function(error) {

        });
    };

    $scope.addedResultsDetails = true;
    $scope.deletedResultsDetails = true;
    $scope.autoscale = function(){

        if($scope.minimumCount > $scope.sensorTypeCount) {
            $http.post(
                host + 'api/v1/addToSensorHub',
                //'http://localhost:5000/api/v1/addToSensorHub',
                {
                    sensorhubname: $scope.hubname,
                    sensorType: $scope.sensorType,
                    imageId: $scope.imageId,
                    username: $cookies.get('username'),
                    count: $scope.minimumCount - $scope.sensorTypeCount
                },
                {cors: true}
            )
                .success(function (data) {
                    var result = JSON.parse(JSON.stringify(data));
                    console.log(result.statusCode);
                    console.log(result.instanceDetails);
                    $scope.addedSensors = result.instanceDetails;
                    $scope.addedResultsDetails = false;
                })
                .error(function (error) {
                    console.log('error')
                });

        } else if($scope.maximumCount < $scope.sensorTypeCount) {
            $http.post(
                host + 'api/v1/deleteFromSensorHub',
                //'http://localhost:5000/api/v1/deleteFromSensorHub',
                {
                    sensorhubname: $scope.hubname,
                    sensorType: $scope.sensorType,
                    imageId: $scope.imageId,
                    username: $cookies.get('username'),
                    count:  $scope.sensorTypeCount - $scope.maximumCount
                },
                {cors: true}
            )
                .success(function (data) {
                    var result = JSON.parse(JSON.stringify(data));
                    console.log(result.statusCode);
                    console.log(result.instanceDetails);
                    $scope.deletedSensors = result.instanceDetails;
                    $scope.deletedResultsDetails = false;
                })
                .error(function (error) {
                    console.log('error')
                });

            //$state.go('profile');
        }


        $http({
            method : "POST",
            url : '/getSensorTypeCount',
            data : {
                "hubname" : $scope.hubname,
                "sensorType": $scope.sensorType,
                "username" : $cookies.get('username')
            }
        }).success(function(data) {
            // checking the response data for statusCode
            if (data.statusCode == 200) {
                $scope.sensorTypeCount = data.count;
            }
        }).error(function(error) {

        });
    };


    $scope.listSensor = function () {
        $http({
            method : "POST",
            url : '/listsensors',
            data : {
                "hubname" : $scope.hubname,
                "username" : $cookies.get('username')
            }
        }).success(function(data) {
            // checking the response data for statusCode
            if (data.statusCode == 200) {
                $scope.hideSensorHubName = false;
                $scope.hideSensorList = false;
                $scope.sensorlist = data.sensorlist;
            }
        }).error(function(error) {

        });
    };

    /*
     $scope.getSensorInstances = function () {
     console.log("HubName: "+ $scope.hubname + "username:" + $cookies.get('username') + "SensorType: "
     + $scope.sensortypename);
     $http({
     method : "POST",
     url : '/listSensorInstances',
     data : {
     "hubname" : $scope.hubname,
     "username" : $cookies.get('username'),
     "sensorType": $scope.sensortypename
     }
     }).success(function(data) {
     // checking the response data for statusCode
     if (data.statusCode == 200) {
     console.log("Data received:" + JSON.stringify(data));
     $scope.hideSensorHubName = false;
     $scope.hideSensorInstancesList = false;
     $scope.hideDate = false;
     $scope.sensorInstanceslist = data.sensorInstanceslist;
     }
     }).error(function(error) {
     });
     };*/

    $scope.startSensor = function(instanceId){
        console.log("Startign sensor" + instanceId);
        $http.post(
            host + 'api/v1/start',
            //'http://localhost:5000/api/v1/start',
            {
                instanceid: instanceId
            },
            { cors: true }
        )
            .success(function(data){
                var result = JSON.parse(JSON.stringify(data));
                console.log("Result: " + result.statusCode);
                if(result.statusCode == 200){
                    $scope.message="running";
                    $scope.selectedSensor.Status = 'running';
                    $scope.hideSensorManager = false;
                }
            })
            .error(function(error){
                console.log('error')
            })
    };

    $scope.stopSensor = function(instanceId){
        console.log("Stopping Sensor" + instanceId);
        $http.post(
            host + 'api/v1/stop',
            //'http://localhost:5000/api/v1/stop',
            {
                instanceid: instanceId
            },
            { cors: true }
        )
            .success(function(data){
                var result = JSON.parse(JSON.stringify(data));
                console.log("Result: " + result.statusCode);
                if(result.statusCode == 200){
                    $scope.message="stopped";
                    $scope.selectedSensor.Status = 'stopped';
                    $scope.hideSensorManager = false;
                }
            })
            .error(function(error){
                console.log('error')
            })
    };

    $scope.terminateSensor = function(instanceId){
        console.log("Terminating Sensor" + instanceId);
        $http.post(
            host + 'api/v1/terminate',
            //'http://localhost:5000/api/v1/terminate',
            {
                instanceid: instanceId
            },
            { cors: true }
        )
            .success(function(data){
                var result = JSON.parse(JSON.stringify(data));
                console.log("Result: " + result.statusCode);
                if(result.statusCode == 200){
                    $scope.message="terminated";
                    $scope.selectedSensor.Status = 'terminated';
                    $scope.hideSensorManager = false;
                }
            })
            .error(function(error){
                console.log('error')
            })
    };

    $scope.monitorSensor = function (sensorInfo) {
        $scope.selectedSensor = sensorInfo;
        $scope.hideMonitoringDetails = true;
        $scope.hideErrormessage = true;
        $scope.hideGraphDetails = true;
    };

    $scope.monSensor = function(sensorId){
        $http.post(
            host + 'api/v1/getMonitoringInfo',
            //'http://localhost:5000/api/v1/getMonitoringInfo',
            {
                sensorid: sensorId,
                startDate : $scope.startDate
            },
            { cors: true }
        )
            .success(function(data){
                var result = JSON.parse(JSON.stringify(data));
                if(result.statusCode == 200) {
                    $scope.hideMonitoringDetails = false;
                    $scope.hideErrormessage = true;
                    $scope.hideGraph = false;
                    $scope.hideGraphDetails = true;
                    $scope.sensorid = result.sensorid;
                    console.log(result.cpuutilisationAverage);
                    $scope.status = result.state;
                    $scope.cpuUtilizationAvg = result.cpuutilisationAverage;
                    $scope.networkInMet = result.networkInAverage;
                    $scope.networkOutMet = result.networkoutAverage;

                    $scope.labels = ["Utilized", "Empty"];
                    $scope.data = [100 * result.cpuutilisationAverage, 100 - (100 * result.cpuutilisationAverage)];

                    $scope.labelsNetIn = ["Utilized", "Empty"];
                    $scope.dataNetIn = [result.networkInAverage / 9000, 100 - (result.networkInAverage / 9000)];

                    $scope.labelsNetOut = ["Utilized", "Empty"];
                    $scope.dataNetOut = [result.networkoutAverage / 200, 100 - (result.networkoutAverage / 200)];

                    $scope.colours = ["#26B99A",
                        "#34495E"];
                } else if(result.statusCode == 201) {
                    $scope.hideMonitoringDetails = true;
                    $scope.hideErrormessage = false;
                    $scope.hideGraph = true;
                    $scope.hideGraphDetails = true;

                    $scope.displayerrormessage = "Sensor was launched on " + result.launchtime + " .Please select date and time after launch date";

                } else if(result.statusCode == 202) {
                    $scope.hideMonitoringDetails = true;
                    $scope.hideErrormessage = false;
                    $scope.hideGraph = true;
                    $scope.hideGraphDetails = true;
                    $scope.displayerrormessage = "Please select date and time before current date and time";

                } else if(result.statusCode == 203) {
                    $scope.hideMonitoringDetails = true;
                    $scope.hideErrormessage = true;
                    $scope.hideGraph = true;
                    $scope.hideGraphDetails = false;

                    $scope.sensorid = result.sensorid;
                    $scope.status = result.state;
                    $scope.messgae = "Sensor is " + result.state.Name + ". Hence monitoring details is not available";
                } else if(result.statusCode == 205) {
                    $scope.hideMonitoringDetails = true;
                    $scope.hideErrormessage = false;
                    $scope.hideGraph = true;
                    $scope.hideGraphDetails = true;
                    $scope.displayerrormessage = "No data available for this date and time. Pease check after some time";
                }

            })
            .error(function(error){
                console.log('error')
            })
    };

    /*    $scope.reloadMonitor = function(sensorId){
     $state.go('monitor', {'test':'hi'});
     }*/

    $scope.getSensorData = function (sensorId) {
        $scope.hideMonitoringDetails = true;
        $scope.hideErrormessage = true;
        $scope.hideGraphDetails = true;


        $http.post(
            '/getSensorData',
            {
                sensorid: sensorId,
                startDate : $scope.startDate,
                username : $cookies.get('username')
            },
            { cors: true }
        )
            .success(function(data){
                if(data.statusCode == 200) {
                    $scope.hideMonitoringDetails = false;
                    $scope.hideErrormessage = true;
                    $scope.hideData = false;
                    $scope.hideGraphDetails = true;
                    $scope.sensorData = data.sensorData;
                }
            })
            .error(function(error){
                console.log('error')
            })
    };
}
]);
app.filter('dateToUTC', function() {
    return function(input) {
        return new Date(input).toUTCString();
    };
});