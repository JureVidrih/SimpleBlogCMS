var mongoose = require('mongoose');

var dbusers = {
    init: function init() {
        this.userSchema = new mongoose.Schema({
            username: String,
            password: String,
            about: String
        });
        this.userDBModel = mongoose.model("User", this.userSchema); 
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
    }
};

module.exports = dbusers;