"use strict"
app.controller('signupcontroller',['$scope','$http',function ($scope,$http){

    $scope.addNewUser = function(){

        $http.post(
            'http://localhost:5000/addUser',
            {
                username : $scope.new_user,
                email : $scope.new_email,
                password: $scope.password
            },
            { cors:true}
        )
            .success(function(data){

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