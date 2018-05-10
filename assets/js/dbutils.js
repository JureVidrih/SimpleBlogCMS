var mongoose = require('mongoose');
var dbusers = require('./../../models/dbusers');
var dbposts = require('./../../models/dbposts');
var dbcomments = require('./../../models/dbcomments');

var dbutils = {
    connectToMongoServer: function connectToMongoServer() {
        mongoose.connect("mongodb://localhost/simpleblogcms");
    }
};

module.exports = dbutils;