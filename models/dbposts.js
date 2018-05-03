var mongoose = require('mongoose');

var dbposts = {
    init: function init(commentSchema) {
        this.postSchema = new mongoose.Schema({
            postTitle: String,
            postAuthor: String,
            postContent: String,
            originalDate: String,
            comments: [commentSchema]
        });
    
        this.postDBModel = mongoose.model("Post", this.postSchema);
    },
    postsArray: [],
    postsArray: [],
    findAPostById: function findAPostById(id, errAction, successAction) {
        this.postDBModel.findById(id, function(err, foundPost) {
            if(err) {
                errAction();
            } else {
                successAction(foundPost);
            }
        });
    },
    // updateCommentsOfPosts: function updateCommentsOfPosts() {
    //     this.updateComments();
    //     console.log("Entering comment purge with " + this.commentsArray.length + " number of all comments.");
    //     this.postsArray.forEach(function(post) {
    //         if(this.commentsArray.length > 0) {
    //             var count = 0;
    //             post.comments.forEach(function(comment, index) {
    //                 var deleteComment = true;
    //                 var commentIndex = 0;
    //                 console.log("comment: " + comment);
    //                 this.commentsArray.forEach(function(arrayComment) {
    //                     var valueA = String(comment);
    //                     var valueB = String(arrayComment._id);
    //                     console.log(valueA + " | " + valueB);
    //                     if(valueA == valueB) {
    //                         console.log("It's false!");
    //                         deleteComment = false;
    //                         commentIndex = index;
    //                         return;
    //                     }
    //                 });
    //                 if(deleteComment) {
    //                     console.log("Deleting the comment: " + post.comments[commentIndex]);
    //                     post.comments.shift();
    //                     count++;
    //                 }
    //             }.bind(this));

    //             post.save(function(err) {
    //                 if(err) {
    //                     console.log("There was an error saving the post after removal of dead comments.");
    //                 } else {
    //                     console.log("Successfully removed " + count + " dead comments.");
    //                 }
    //             });
    //         } else {
    //             if(post.comments.length > 0) {
    //                 for(var i = post.comments.length; i > 0; i--) {
    //                     post.comments.pop();
    //                 }
    //                 post.save(function(err) {
    //                     if(err) {
    //                         console.log("There was an error saving the post after removing all the comments.");
    //                     } else {
    //                         console.log("Successfully removed all dead comments.");
    //                     }
    //                 });
    //             } else {
    //                 console.log("There were no dead comments to remove.");
    //             }
    //         }
    //     }.bind(this));

    //     // DBModels.postDBModel.find({}).populate("comments").exec(function(err, result) {
    //     //     if(err) {
    //     //         console.log("An error occured while populating comments in posts.");
    //     //     } else {
    //     //         console.log("Comments in posts were successfully populated.");
    //     //     }
    //     // });
    // },
    updatePosts: function updatePosts() {
        // this.postDBModel.find({}).populate("comments").exec(function(err, result) {
        //     if(err) {
        //         console.log(err);
        //     } else {
        //         console.log("List of all posts: ");
        //         console.log(result);
        //         this.postsArray = result;
        //     }
        // }.bind(this));

        this.postDBModel.find({}, function(err, foundPosts) {
            if(err) {
                console.log("There was an error retrieving the posts from database.");;
            } else {
                console.log("Found posts: " + foundPosts);
                this.postsArray = foundPosts;
                // this.updateCommentsOfPosts();
            }
        }.bind(this));
    },
    addAPost: function addAPost(newPost, errCallback, successCallback) {
        newPost = new DBModels.postDBModel(newPost);
        newPost.save(function(err, result) {
            if(err) {
                console.log(err);
                errCallback();
            } else {
                console.log(result + " added to the database.");
                this.updatePosts();
                successCallback();
            }
        }.bind(this));
    },
    attachAComment: function attachAComment(id, comment) {
        this.findAPostById(id, function() {
            console.log("Couldn't find the post for attaching a comment to it.");
        }, function(foundPost) {
            console.log("Saving a comment: " + comment);
            foundPost.comments.push(comment);
            foundPost.save(function(err, result) {
                if(err) {
                    console.log("Couldn't save the post after attaching a comment to it.")
                } else {
                    console.log("Successfully saved the post after attaching a comment to it. Result: " + result);
                }
            });
        });
    }
};

module.exports = dbposts;