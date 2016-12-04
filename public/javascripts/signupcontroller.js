"use strict"
app.controller('signupcontroller',['$state', '$scope','$http',function ($state, $scope, $http){

    $scope.addNewUser = function(){
        var host = 'http://localhost:5000/';

        $http.post(
            host + 'api/v1/register',
            {
                UserName : $scope.new_user,
                EmailId : $scope.new_email,
                Password: $scope.new_password
            },
            { cors:true}
        )
            .success(function(data){
                console.log("Data" + JSON.stringify(data));
                if(data.statusCode == 200)
                {
                    $state.go('login')
                }
                else
                {
                    console.log('error')
                }

            })
            .error(function(error){
                console.log('error');
            });

    }

}]);