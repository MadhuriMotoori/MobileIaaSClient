"use strict"
app.controller('signupcontroller',['$state', '$scope','$http', '$cookies',function ($state, $scope, $http, $cookies){
    var host = 'http://mydbinstance.cmxia5o2lhpo.us-west-2.rds.amazonaws.com:5000/';
    $scope.addNewUser = function(){
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