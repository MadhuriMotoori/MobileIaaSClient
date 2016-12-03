/**
 * Created by akash on 8/14/16.
 */
"use strict"
 var app = angular.module('spa',['chart.js','ui.router','ui.bootstrap','ngCookies', 'ngStorage']);
    app.config(function($stateProvider, $urlRouterProvider){

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('login', {
                url: '/',
                views: {
                    'main@':{
                        templateUrl: 'login.ejs',
                        controller:'logincontroller'
                    }
                }

            })
            .state('admin', {
                url: "/admin",
                views:{
                    'main@':{
                        templateUrl: 'adminlogin.ejs',
                        controller:'admincontroller'
                    }
                }
            })
            .state('signup', {
                url: "/signup",
                views:{
                    'main@':{
                        templateUrl: 'signup.ejs',
                        controller:'signupcontroller'
                    }
                }
            })
            .state('profile', {
                url: "/profile",
                views:{
                    'header': {
                        templateUrl: 'header.ejs',
                    },
                    'footer': {
                        templateUrl: 'footer.ejs',
                    },
                    'main@':{
                        templateUrl: 'profile.ejs',
                        controller : 'profilecontroller'
                    }
                },
                params: { test: "default value" }
            })
            .state('adminprofile', {
                url: "/adminprofile",
                views:{
                    'header': {
                        templateUrl: 'header.ejs',
                    },
                    'footer': {
                        templateUrl: 'footer.ejs',
                    },
                    'main@':{
                        templateUrl: 'profile.ejs',
                        controller : 'profilecontroller'
                    }
                },
                params: { test: "default value" }
            })
            .state('createSensorHub', {
                url: "/createsensorhub",
                views:{
                    'header': {
                        templateUrl: 'header.ejs',
                    },
                    'footer': {
                        templateUrl: 'footer.ejs',
                    },
                    'main@':{
                        templateUrl: 'createSensorHubForm.ejs',
                        controller : 'createsensorhubcontroller'
                    }
                },
                params: { test: "default value" }
            })
            .state('createSensor', {
                url: "/createsensor",
                views:{
                    'header': {
                        templateUrl: 'header.ejs',
                    },
                    'footer': {
                        templateUrl: 'footer.ejs',
                    },
                    'main@':{
                        templateUrl: 'createSensorForm.ejs',
                        controller : 'createsensorcontroller'
                    }
                },
                params: { test: "default value" }
            })
            .state('sensorManagement', {
                url: "/sensorManagement",
                views:{
                    'header': {
                        templateUrl: 'header.ejs',
                    },
                    'footer': {
                        templateUrl: 'footer.ejs',
                    },
                    'main@':{
                        templateUrl: 'management.ejs',
                        controller : 'managementController'
                    }
                },
                params: { test: "default value" }
            })
            .state('home', {
                url: "/home",
                views:{
                    'header': {
                        templateUrl: 'header.ejs',
                    },
                    'footer': {
                        templateUrl: 'footer.ejs',
                    },
                    'main@':{
                        templateUrl: 'home.ejs',
                        controller : 'homecontroller'
                    }
                },
                params: { test: "default value" }
            })
            .state('monitor', {
                url: "/monitor",
                views:{
                    'header': {
                        templateUrl: 'header.ejs',
                    },
                    'footer': {
                        templateUrl: 'footer.ejs',
                    },
                    'main@':{
                        templateUrl: 'monitor.ejs',
                        controller : 'managementController'
                    }
                },
                params: { test: "default value" }
            })
            .state('autoscaling', {
                url: "/autoscaling",
                views:{
                    'header': {
                        templateUrl: 'header.ejs',
                    },
                    'footer': {
                        templateUrl: 'footer.ejs',
                    },
                    'main@':{
                        templateUrl: 'autoscaling.ejs',
                        controller : 'autoscalingcontroller'
                    }
                },
                params: { test: "default value" }
            });

    });
