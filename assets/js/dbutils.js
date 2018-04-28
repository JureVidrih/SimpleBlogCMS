var mongoose = require('mongoose');
var DBModels = require('../../models/DBModels');

var dbutils = {
    connectToMongoServer: function connectToMongoServer() {
        mongoose.connect("mongodb://localhost/simpleblogcms");
        
        this.createAModelFromSchema();
        
        dbutils.updateUsers();
        dbutils.updatePosts();
        dbutils.updateComments();
    },
    createAModelFromSchema: function createAModelFromSchema() {
        DBModels.init();
    },

    // USERS COLLECTIONS METHODS AND PROPERTIES
    usersArray: [],
    updateUsers: function updateUsers() {
        DBModels.userDBModel.find({}, function(err, result) {
            if(err) {
                console.log(err);
            } else {
                console.log("List of all users: ");
                console.log(result);
                this.usersArray = result;
            }
        }.bind(this));
    },
    addAUser: function addAUser(newUser, errCallback, successCallback) {
        newUser = new this.userDBModel(newUser);
        newUser.save(function(err, result) {
            if(err) {
                console.log(err);
                errCallback();
            } else {
                console.log(result + " added to the database.");
                this.updateUsers();
                successCallback();
            }
        }.bind(this));
    },
    checkUserName: function checkUserName(username) {
        console.log("Checking user name..");
        success = true;
        this.usersArray.forEach(function(userelem) {
            if(userelem.username === username) {
                success = false;

                return;
            }
        });

        return success;
    },
    authenticate: function authenticate(user) {
        console.log("Authenticating..");
        success = false;
        this.usersArray.forEach(function(userelem) {
            console.log(userelem.username + " | " + user.username);
            if(userelem.username === user.username && userelem.password === user.password) {
                success = true;
    
                return;
            }
        });
    
        return success;
    },
    // POSTS COLLECTIONS METHODS AND PROPERTIES
    postsArray: [],
    findAPostById: function findAPostById(id, errAction, successAction) {
        DBModels.postDBModel.findById(id, function(err, foundPost) {
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

        DBModels.postDBModel.find({}, function(err, foundPosts) {
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
    },
    // COMMENTS COLLECTIONS METHODS AND PROPERTIES
    commentsArray: [],
    findACommentById: function findACommentById(id, errAction, successAction){
        DBModels.commentDBModel.findById(id, function(err, foundComment) {
            if(err) {
                errAction();
            } else {
                successAction(foundComment);
            }
        });
    },
    updateComments: function updateComments() {
        DBModels.commentDBModel.find({}, function(err, comments) {
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
        newComment = DBModels.commentDBModel(newComment);
        newComment.save(function(err, result) {
            if(err) {
                console.log("Error saving a comment.");
            } else {
                DBModels.postDBModel.findOne({_id: newComment.postId}, function(err, foundPost) {
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

module.exports = dbutils;