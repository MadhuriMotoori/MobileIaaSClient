
"use strict"
app.controller('admincontroller',['$scope','$http','$state','$cookies',function ($scope,$http,$state,$cookies){
    var host = $cookies.get('serverHost');
    //var host = 'http://localhost:5000/';

    $scope.adminValidate = function(){
        $http.post(
                host + 'api/v1/adminValidate',
                {
                    username:$scope.username,
                    password:$scope.password
                },
                { cors:true}
            )
            .success(function(data){

                if(data.statusCode == 200)
                {
                    $cookies.put('username',$scope.username);
                    $state.go('adminprofile',{'test':data.username});
                }
                else
                {
                    
                }

            })
            .error(function(data){
                console.log('error');
            })
    }
}]);