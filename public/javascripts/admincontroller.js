
"use strict"
app.controller('admincontroller',['$scope','$http','$state','$cookies',function ($scope,$http,$state,$cookies){


    $scope.adminValidate = function(){
        $http.post(
                'http://localhost:5000/adminValidate',
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
                    $state.go('adminprofile',{'test':'admin profile'});
                }
                else
                {
                    /*do something*/
                    
                }

            })
            .error(function(data){
                console.log('error');
            })
    }

    /*$scope.save_session = function(){
        $http.post(
            '/saveSession',
            {
              username : $scope.username
            })
            .success(function (data) {
                if(data.statusCode == 200){
                    console.log('session saved');
                    console.log(request.session.username)
                }
                else
                {
                    console.log('session not saved');
                }
        }).error(function(data){
            console.log('something wrong with client');
        })
    }*/
}]);