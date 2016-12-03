var ejs= require("ejs");
var mysql = require('./mysql');


exports.listsensorhub = function(req, res){
    var username = req.body.username;
    var getHubName = "select distinct SensorHubName from usersensorhubdetails where username = '" + username + "';";
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


exports.listsensors = function(req, res){
    var username = req.body.username;
    var sensorhubname = req.body.hubname;
    var getSensorList = "select distinct SensorType from usersensorhubdetails where username = '" + username + "' and sensorhubname = '" + sensorhubname + "';";
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