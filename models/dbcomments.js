var mongoose = require('mongoose');
var dbUsers = require('./dbusers');

var dbcomments = {};

var commentSchema = new mongoose.Schema({
    author: dbUsers.userSchema,
    content: String
});

var Comment = mongoose.model("Comment", commentSchema); 

dbcomments.commentSchema = commentSchema;
dbcomments.Comment = Comment;

module.exports = dbcomments;