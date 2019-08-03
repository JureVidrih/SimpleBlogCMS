var mongoose = require('mongoose');
var dbcomments = require('./dbcomments');

var dbposts = {};

var postSchema = new mongoose.Schema({
    postTitle: String,
    postAuthor: String,
    postContent: String,
    originalDate: String,
    comments: [dbcomments.commentSchema]
});

var Post = mongoose.model("Post", postSchema);

dbposts.postSchema = postSchema;
dbposts.Post = Post;

module.exports = dbposts;