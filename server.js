var express = require('express'), 
app = express();

var bpars = require('body-parser');

var dbutils = require('./assets/js/dbutils');
dbutils.connectToMongoServer();
dbutils.updateUsers();
dbutils.updatePosts();

app.use(express.static("public"));
app.use(express.static("assets"));
app.use(express.static("build"));
app.use(bpars.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
    var posts = dbutils.postsArray;
    res.render("index", {origin: "index", posts: posts});
});

app.get("/gallery", function(req, res) {
    res.render("gallery", {origin: "gallery"});
});

app.get("/posts", function(req, res) {
    var posts = dbutils.postsArray;
    res.render("partials/posts", {origin: "posts", posts: posts});
});

app.get("/posts/new", function(req, res) {
    res.render("postNew", {origin: "newPost"});
});

app.get("/posts/show/:id", function(req, res) {
    var postId = req.params.id;

    this.errAction = function() {
        res.send("Post with an id of " + postId + " wasn't found.");
    }

    this.successAction = function(post) {
        res.render("postShow.ejs", {origin: "showPost", post: post});
    }

    var post = dbutils.findAPostById(postId, this.errAction, this.successAction);

    // postId = Number(postId);

    // if(isNaN(postId) || postId >= posts.length) {
    //     console.log("An invalid post show route with an Id of " + req.params.id + " has been accessed.");
    //     res.send("Invalid post ID! It most likely isn't a number!");
    // } else {
    //     console.log("Showing post #" + postId);
    //     res.render("postShow.ejs", {post: posts[postId]});
    // }
});

app.post("/posts", function(req, res) {
    var postTitle = req.body.postTitle;
    var postAuthor = req.body.postAuthor;
    var postContent = req.body.postContent;
    var postDate = new Date();
    dbutils.addAPost({postTitle: postTitle, postContent: postContent, postAuthor: postAuthor, originalDate: postDate});
    res.redirect("/");
});

app.get("/login", function(req, res) {
    res.render("login", {origin: "login"});
});

app.post("/login", function(req, res) {
    username = req.body.username;
    password = req.body.password;

    authSuccess = dbutils.authenticate({username: username, password: password});

    if(authSuccess) {
        console.log("User " + username + " has successfully logged in.");
    } else {
        console.log("An unsuccessful attempt at login has occured (username: " + username + ", password: " + password + ").");
    }

    res.redirect("/");
});

app.get("/signup/new", function(req, res) {
    res.render("signupForm", {origin: "newSignUp"});
});

app.post("/signup", function(req, res) {
    newUser = {username: req.body.username, password: req.body.password, about: req.body.aboutuser};
    authSuccess = dbutils.checkUserName(newUser.username);
    if(authSuccess) {
        dbutils.addAUser(newUser);
        console.log("New user created! Data: " + newUser.username + ", " + newUser.password);
        res.render("signupSuccess", {newUserData: newUser, id: dbutils.usersArray.length});
    } else {
        console.log("An unsuccessful attempt to register an account has occured.");
        res.send("Invalid username. Try another one.")
    }
});

app.listen(3000, "localhost", function() {
    console.log("Server started at localhost:3000...");
});
