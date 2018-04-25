var mongoose = require('mongoose');

var dbutils = {
    connectToMongoServer: function connectToMongoServer() {
        mongoose.connect("mongodb://localhost/simpleblogcms");
        
        this.createAModelFromSchema();
        
        dbutils.updateUsers();
        dbutils.updatePosts();
    },
    createAModelFromSchema: function createAModelFromSchema() {
        this.userSchema = new mongoose.Schema({
            username: String,
            password: String,
            about: String
        });
        this.userDBModel = mongoose.model("User", this.userSchema);

        this.postSchema = new mongoose.Schema({
            postTitle: String,
            postAuthor: String,
            postContent: String,
            originalDate: String
        });

        this.postDBModel = mongoose.model("Post", this.postSchema);
    },
    usersArray: [],
    updateUsers: function updateUsers() {
        this.userDBModel.find({}, function(err, result) {
            if(err) {
                console.log(err);
            } else {
                console.log("List of all users: ");
                console.log(result);
                this.usersArray = result;
            }
        }.bind(this));
    },
    addAUser: function addAUser(newUser) {
        newUser = new this.userDBModel(newUser);
        newUser.save(function(err, result) {
            if(err) {
                console.log(err);
            } else {
                console.log(result + " added to the database.");
                this.updateUsers();
            }
        }.bind(this));
    },
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
    updatePosts: function updatePosts() {
        this.postDBModel.find({}, function(err, result) {
            if(err) {
                console.log(err);
            } else {
                console.log("List of all posts: ");
                console.log(result);
                this.postsArray = result;
            }
        }.bind(this));
    },
    addAPost: function addAPost(newPost) {
        newPost = new this.postDBModel(newPost);
        newPost.save(function(err, result) {
            if(err) {
                console.log(err);
            } else {
                console.log(result + " added to the database.");
                this.updatePosts();
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
    addANewUser: function addANewUser(newUser) {

    }
};

module.exports = dbutils;