var mongoose = require('mongoose');

var dbcomments = {
    init: function init() {
        this.commentSchema = new mongoose.Schema({
            // postId: String,
            author: String,
            content: String
        });
    
        this.commentDBModel = mongoose.model("Comment", this.commentSchema); 
    },
    commentsArray: [],
    findACommentById: function findACommentById(id, errAction, successAction){
        this.commentDBModel.findById(id, function(err, foundComment) {
            if(err) {
                errAction();
            } else {
                successAction(foundComment);
            }
        });
    },
    updateComments: function updateComments() {
        this.commentDBModel.find({}, function(err, comments) {
            if(err) {
                console.log("Error updating comments.");
            } else {
                console.log("Lists of all the comments:");
                console.log(comments);
                this.commentsArray = comments;
            }
        }.bind(this));
    },
    addAComment: function addAComment(newComment, errCallback, successCallback) {
        newComment = this.commentDBModel(newComment);
        newComment.save(function(err, result) {
            if(err) {
                console.log("Error saving a comment.");
            } else {
                this.postDBModel.findOne({_id: newComment.postId}, function(err, foundPost) {
                    if(err) {
                        console.log("An error occured.");
                        errCallback();
                    } else {
                        console.log("Pushing the new comment into a post array.");
                        foundPost.comments.push(newComment);
                        foundPost.save(function(err, savedPost) {
                            if(err) {
                                console.log("An error occured while saving a post!");
                                errCallback();
                            } else {
                                console.log("New post: " + savedPost);
                                successCallback();
                            }
                        }.bind(this));
                    }
                }.bind(this));
            }
        }.bind(this));

        this.updateComments();
        this.updatePosts();
    }
};

module.exports = dbcomments;