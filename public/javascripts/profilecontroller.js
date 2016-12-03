
"use strict"
  app.controller('profilecontroller',['$scope','$http','$state','$cookies',function ($scope,$http,$state,$cookies){

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
    }
      
      
  }])