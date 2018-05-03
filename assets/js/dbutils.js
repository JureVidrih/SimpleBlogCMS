var mongoose = require('mongoose');
var dbusers = require('./../../models/dbusers');
var dbposts = require('./../../models/dbposts');
var dbcomments = require('./../../models/dbcomments');

var dbutils = {
    connectToMongoServer: function connectToMongoServer() {
        mongoose.connect("mongodb://localhost/simpleblogcms");
        
        this.createAModelFromSchema();
        
        dbusers.updateUsers();
        dbposts.updatePosts();
        dbcomments.updateComments();
    },
    createAModelFromSchema: function createAModelFromSchema() {
        dbusers.init();
        dbcomments.init();
        dbposts.init(dbcomments.commentSchema);
    },
    testMethod: function testMethod(a, b) {
        console.log(a + " " + b);
    }
};

module.exports = dbutils;