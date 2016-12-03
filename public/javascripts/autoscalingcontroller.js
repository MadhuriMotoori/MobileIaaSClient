"use strict"
app.controller('autoscalingcontroller',['$scope','$http','$state','$cookies',function ($scope, $http, $state, $cookies) {
    $scope.imageId = "ami-c074d7a0";

    $scope.hideSensorList = true;
    $scope.hideSensorHubName = true;
    $scope.hideMonitoringDetails = true;
    $scope.hideDate = true;
    $scope.hideMonitoringDetails = true;
    $scope.hideMonitorForm = false;
    $scope.resultsStartDetails = true;
    $scope.resultsStopDetails = true;
    $scope.resultsTerminateDetails = true;


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
    }

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

    }

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

    };

    $scope.startSensor = function(instanceId){
        console.log("Startign sensor" + instanceId);
        $http.post(
            'http://localhost:5000/api/v1/start',
            {
                instanceid: instanceId
            },
            { cors: true }
        )
            .success(function(data){
                var result = JSON.parse(JSON.stringify(data));
                console.log("Result: " + result.statusCode);
                if(result.statusCode == 200){
                    $scope.StartedSensorId = instanceId;
                    $scope.resultsStartDetails = false;
                    $scope.resultsStopDetails = true;
                }
            })
            .error(function(error){
                console.log('error')
            })
    };

    $scope.stopSensor = function(instanceId){
        console.log("Stopping Sensor" + instanceId);
        $http.post(
            'http://localhost:5000/api/v1/stop',
            {
                instanceid: instanceId
            },
            { cors: true }
        )
            .success(function(data){
                var result = JSON.parse(JSON.stringify(data));
                console.log("Result: " + result.statusCode);
                if(result.statusCode == 200){
                    $scope.StoppedSensorId = instanceId;
                    $scope.resultsStartDetails = true;
                    $scope.resultsStopDetails = false;
                }
            })
            .error(function(error){
                console.log('error')
            })
    };

    $scope.terminateSensor = function(instanceId){
        console.log("Terminating Sensor" + instanceId);
        $http.post(
            'http://localhost:5000/api/v1/terminate',
            {
                instanceid: instanceId
            },
            { cors: true }
        )
            .success(function(data){
                var result = JSON.parse(JSON.stringify(data));
                console.log("Result: " + result.statusCode);
                if(result.statusCode == 200){
                    $scope.TerminatedSensorId = instanceId;
                    $scope.resultsStartDetails = true;
                    $scope.resultsStopDetails = true;
                    $scope.resultsTerminateDetails = false;
                }
            })
            .error(function(error){
                console.log('error')
            })
    };

    $scope.monitorSensor = function(sensorId){
        $http.post(
            'http://localhost:5000/api/v1/getMonitoringInfo',
            {
                sensorid: sensorId,
                startDate : $scope.startDate,
                endDate : $scope.endDate
            },
            { cors: true }
        )
            .success(function(data){
                $scope.hideMonitoringDetails = false;
                $scope.hideMonitorForm = true;

                var result = JSON.parse(JSON.stringify(data));
                console.log(result.cpuCreditUsageMet.Datapoints[0].Average);
                $scope.sensorid = result.sensorid;
                $scope.status = result.state;
                $scope.cpuUtilizationAvg = result.cpuUtilizationMet.Datapoints[0].Average;
                $scope.cpuCreditUsageMet = result.cpuCreditUsageMet.Datapoints[0].Average;
                $scope.networkPacketsInMet =  result.networkPacketsInMet.Datapoints[0].Average;
                $scope.networkPacketsOutMet =  result.networkPacketsOutMet.Datapoints[0].Average;
                $scope.networkInMet =  result.networkInMet.Datapoints[0].Average;
                $scope.networkOutMet =  result.networkOutMet.Datapoints[0].Average;

                $scope.labels = ["Utilized", "Empty"];
                $scope.data = [100*result.cpuUtilizationMet.Datapoints[0].Average, 100-(100*result.cpuUtilizationMet.Datapoints[0].Average)];



                $scope.labelsNetIn = ["Utilized", "Empty"];
                $scope.dataNetIn = [result.networkInMet.Datapoints[0].Average/9000, 100-(result.networkInMet.Datapoints[0].Average/9000)];



                $scope.labelsNetOut = ["Utilized", "Empty"];
                $scope.dataNetOut = [result.networkOutMet.Datapoints[0].Average/200, 100-(result.networkOutMet.Datapoints[0].Average/200)];

                $scope.colours = ["#ff1919",
                    "#808080"];

            })
            .error(function(error){
                console.log('error')
            })
    };

    $scope.reloadMonitor = function(sensorId){
        $state.go('monitor', {'test':'hi'});
    }

}
]);