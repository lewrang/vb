"use strict";

var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var models = require("./models");
var routes = require("./app/routes");

var app = express();

app.use(express.static('public'));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");

    return next();
});


app.use("/", routes);

models.sequelize.authenticate()
    .then(function () {
        console.log("Connection has been established successfully.");
        return models.sequelize.sync();
    }, function (err) {
        console.log("Unable to connect to the database: ", err);
    });

var server = app.listen(8081, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://" + host + ":" + port)
});

