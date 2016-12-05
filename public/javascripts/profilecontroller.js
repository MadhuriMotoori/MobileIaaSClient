
"use strict"
  app.controller('profilecontroller',['$scope','$http','$state','$cookies', '$interval',function ($scope, $http, $state, $cookies, $interval){

    if($cookies.get('username') ==undefined || $cookies.get('username') =='' || $cookies.get('username') == null){
        //$state.go('admin')



    }
    else
    {

        $scope.test = $state.params.test;
        $scope.user = $cookies.get('username');

        $scope.logout = function(){
            $cookies.remove('username');
            $state.go('login')
        }

        var updatedashboard = function() {
            console.log('Changing exampleText');

            $scope.user_sensors_count()
            $scope.user_cluster_count();
            $scope.user_pending_sensorcount();
            $scope.user_active_sensorcount();
            $scope.user_terminated_sensorcount();
            $scope.user_sensor_per_cluster();
            $scope.user_sensor_typecount();
        };
        
        $interval(updatedashboard, 5000);

        $scope.user_sensors_count = function(){
            $http.post(
                'http://localhost:5000/api/v1/totalsensorsbyaccount',
                {
                    username: $cookies.get('username')
                },
                { cors: true }
            )
                .success(function(data){
                    if(data.statusCode == 200)
                    {
                        $scope.sensors = data.sensors;
                    }
                    else
                    {
                    }
                })
                .error(function(error){
                    console.log('error')
                })
        }

        $scope.user_cluster_count = function(){
            $http.post(
                    'http://localhost:5000/api/v1/totalclusterbyaccount',
                    {
                        username: $cookies.get('username')
                    },
                    { cors: true }
                )
                    .success(function(data){
                        if(data.statusCode == 200)
                        {
                            $scope.clusters = data.cluster;
                        }
                        else
                        {
                        }
                    })
                    .error(function(error){
                        console.log('error')
                    })
        }


        $scope.user_active_sensorcount = function () {

            $http.post(
                'http://localhost:5000/api/v1/activesensorsbyaccount',
                {
                    username: $cookies.get('username')
                },
                { cors: true }
            )
                .success(function(data){
                    if(data.statusCode == 200)
                    {
                        $scope.activesensors = data.activesensors;
                        $scope.activesensorlist = data.result;
                    }
                    else
                    {
                    }
                })
                .error(function(error){
                    console.log('error')
                })

        }

        $scope.user_pending_sensorcount = function () {

            $http.post(
                'http://localhost:5000/api/v1/pendingsensorsbyaccount',
                {
                    username: $cookies.get('username')
                },
                {cors: true}
            )
                .success(function (data) {
                    if (data.statusCode == 200) {
                        $scope.pendingsensorscount = data.pendingsensors;
                        $scope.pendingsensorlist = data.result;

                    }
                    else {
                    }
                })
                .error(function (error) {
                    console.log('error')
                })
        }

        $scope.user_terminated_sensorcount = function () {

            $http.post(
                'http://localhost:5000/api/v1/terminatedsensorsbyaccount',
                {
                    username: $cookies.get('username')
                },
                {cors: true}
            )
                .success(function (data) {
                    if (data.statusCode == 200) {
                        $scope.terminatedsensorscount = data.terminatedsensors;
                        $scope.terminatedsensorlist = data.result;
                    }
                    else {
                    }
                })
                .error(function (error) {
                    console.log('error')
                })
        }

        $scope.user_sensor_typecount = function () {
            $http.post(
                'http://localhost:5000/api/v1/typecountbyaccount',
                {
                    username: $cookies.get('username')
                },
                {cors: true}
            )
                .success(function (data) {
                    if (data.statusCode == 200) {
                        $scope.sensorcount = data.count;
                        $scope.sensortypes = data.types;
                    }
                    else {
                    }
                })
                .error(function (error) {
                    console.log('error')
                })
        }

        $scope.user_sensor_per_cluster = function () {
            $http.post(
                'http://localhost:5000/api/v1/sensorperclusterbyaccount',
                {
                    username: $cookies.get('username')
                },
                {cors: true}
            )
                .success(function (data) {
                    if (data.statusCode == 200) {
                        $scope.clustercount = data.count;
                        $scope.clusternames = data.clusters;
                    }
                    else {
                    }
                })
                .error(function (error) {
                    console.log('error')
                })
        }
    }
      
  }])