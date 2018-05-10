var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var dbusers = {};

var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    profilePicture: String,
    about: String
});

userSchema.plugin(passportLocalMongoose);

var User = mongoose.model("User", userSchema);

dbusers.userSchema = userSchema;
dbusers.User = User;

module.exports = dbusers;