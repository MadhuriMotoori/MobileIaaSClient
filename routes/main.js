var ejs= require("ejs");
var mysql = require('./mysql');

exports.listuserSensorDetails = function (req, res) {
    var username = req.body.username;
    var userSensorsInfo = "select * from sensor where UserName = '" + username + "' and Status != 'terminated';";
    var sensorlist = {};
    mysql.fetchData(function(err, results) {
        if (err) {
            throw err;
        } else {
            if (results != null) {
                sensorlist = results;
            }
            var json_response={"statusCode":200,"sensorlist":sensorlist};
            res.send(json_response);
        }
    }, userSensorsInfo);
};

exports.listsensorhub = function(req, res){
    var username = req.body.username;
    var getHubName = "select distinct SensorHubName from sensor where UserName = '" + username + "' and Status != 'terminated';";
    var hubnamelist = {};
    mysql.fetchData(function(err, results) {
        if (err) {
            throw err;
        } else {
            if (results != null) {
                hubnamelist = results;
            }
            console.log("Entered here :" + JSON.stringify(hubnamelist));
            var json_response={"statusCode":200,"hubnamelist":hubnamelist};
            res.send(json_response);
        }
    }, getHubName);
};

exports.getSensorTypeCount = function(req, res){
    var username = req.body.username;
    var sensorhubname = req.body.hubname;
    var sensorType = req.body.sensorType;
    var getSensorCount = "select *  from sensor where UserName = '" + username + "' and SensorHubName = '" + sensorhubname + "' and SensorType= '"+ sensorType + "' and Status != 'terminated';";
    mysql.fetchData(function(err, results) {
        if (err) {
            throw err;
        } else {

            console.log(results);
            var json_response={"statusCode":200,"count": results.length};
            res.send(json_response);
        }
    }, getSensorCount);
};

exports.listsensors = function(req, res){
    var username = req.body.username;
    var sensorhubname = req.body.hubname;
    var getSensorList = "select distinct SensorType from sensor where UserName = '" + username + "' and SensorHubName = '" + sensorhubname + "' and Status != 'terminated';";
    var sensorlist = {};
    mysql.fetchData(function(err, results) {
        if (err) {
            throw err;
        } else {
            if (results != null) {
                sensorlist = results;
            }
            var json_response={"statusCode":200,"sensorlist":sensorlist};
            res.send(json_response);
        }
    }, getSensorList);
};

exports.listSensorsInstances = function(req, res){

    var username = req.body.username;
    var sensorType = req.body.sensorType;
    var hubname = req.body.hubname;
    var getSensorInstancesList = "select * from usersensorhubdetails where username = '" + username + "' and SensorHubName = '" + hubname + "' and SensorType = '"
        + sensorType + "';";
    console.log(getSensorInstancesList);
    var sensorInstanceslist = {};
    mysql.fetchData(function(err, results) {
        if (err) {
            throw err;
        } else {
            if (results != null) {
                sensorInstanceslist = results;
            }
            var json_response={"statusCode":200,"sensorInstanceslist":sensorInstanceslist};
            res.send(json_response);
        }
    }, getSensorInstancesList);
};