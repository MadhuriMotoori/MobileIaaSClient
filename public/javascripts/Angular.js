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
                    'navbar@':{
                        templateUrl: 'navbar.ejs',
                        controller: 'navBarController'
                    },
                    'sidemenu@':{
                        templateUrl: 'sidebarView.ejs',
                        controller: 'navBarController'
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
                    'navbar@':{
                        templateUrl: 'navbar.ejs',
                        controller: 'navBarController'
                    },
                    'sidemenu@':{
                        templateUrl: 'sidebarView.ejs',
                        controller: 'navBarController'
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
                    'sidemenu@':{
                        templateUrl: 'sidebarView.ejs',
                        controller: 'navBarController'
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
                    'navbar@':{
                        templateUrl: 'navbar.ejs',
                        controller: 'navBarController'
                    },
                    'sidemenu@':{
                        templateUrl: 'sidebarView.ejs',
                        controller: 'navBarController'
                    },
                    'main@':{
                        templateUrl: 'management.ejs',
                        controller : 'managementController'
                    }
                },
                params: { test: "default value" }
            })
            .state('monitor', {
                url: "/monitor",
                views:{
                    'sidemenu@':{
                        templateUrl: 'sidebarView.ejs',
                        controller: 'navBarController'
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
                    'sidemenu@':{
                        templateUrl: 'sidebarView.ejs',
                        controller: 'navBarController'
                    },
                    'main@':{
                        templateUrl: 'autoscaling.ejs',
                        controller : 'autoscalingcontroller'
                    }
                },
                params: { test: "default value" }
            });

    });
