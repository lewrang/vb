'use strict';

var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");

var basename = path.basename(module.filename);

//var basename = path.basename(module.filename); 

var db = {};
var DATABASE = "quotes";
var USERNAME = "vagrant";
var PASSWORD = "vagrant";

var sequelize = new Sequelize(DATABASE, USERNAME, PASSWORD, {
    "host": "127.0.0.1",
    "port": 5432,
    "dialect": "postgres"
});


fs.readdirSync(__dirname)
    .filter(function (file) {
        return (file.indexOf(".") !== 0) && (file !== basename);
    })
    .forEach(function (file) {
        if (file.slice(-3) !== ".js") return;
        var model = sequelize["import"](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function (modelName) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;

module.exports = db;