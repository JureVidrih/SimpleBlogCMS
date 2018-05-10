var fs = require('fs');
var multer = require('multer');
var upload = multer({dest: "./temp/profilepics"});

function saveFile(path, name) {
    console.log("Saving a file " + path + " to " + name);
    fs.rename(path, name, function(err) {
        console.log(err);
        
        return false;
    });

    console.log("File successfully saved!");
    return true;
}

var express = require('express'), 
app = express();

var session = require('express-session');

var passport = require('passport');
var LocalStrategy = require('passport-local');
var passportLocalMongoose = require('passport-local-mongoose');

var methodOverride = require('method-override');
var bpars = require('body-parser');

var dbutils = require('./assets/js/dbutils');
dbutils.connectToMongoServer();

var dbUsers = require('./models/dbusers');
var dbPosts = require('./models/dbposts');
var dbComments = require('./models/dbcomments');

app.use(session({
    secret: "This is a handy secret that I just wrote.",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(dbUsers.User.authenticate()));
passport.serializeUser(dbUsers.User.serializeUser());
passport.deserializeUser(dbUsers.User.deserializeUser());

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

app.use(function(req, res, next) {
    if(req.user) {
        res.locals.username = req.user.username;
    } else {
        res.locals.username = "";
    }

    next();
});

app.use(express.static("public"));
app.use(express.static("assets"));
app.use(express.static("build"));
app.use(methodOverride("_method"));
app.use(bpars.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
    dbPosts.Post.find({}, function(err, foundPosts) {
        if(!foundPosts) {
            foundPosts = [];
        }
        res.render("index", {origin: "index", posts: foundPosts});
    });
});

app.get("/gallery", function(req, res) {
    res.render("gallery", {origin: "gallery"});
});

app.get("/posts", function(req, res) {
    dbPosts.Post.find({}, function(err, foundPosts) {
        if(err) {
            console.log(err);
            res.redirect("back");
        } else {
            res.render("partials/posts", {origin: "posts", posts: foundPosts});
        }
    });
});

app.get("/posts/new", isLoggedIn, function(req, res) {
    res.render("postNew", {origin: "newPost"});
});

app.get("/posts/:id", function(req, res) {
    dbPosts.Post.findOne({_id: req.params.id}, function(err, foundPost) {
        if(err) {
            res.send("Post with an id of " + req.params.id + " wasn't found.");
        } else {
            res.render("postShow", {origin: "posts", post: foundPost});
        }
    });
});

app.get("/posts/:id/edit", isLoggedIn, function(req, res) {

});

app.post("/posts", isLoggedIn, function(req, res) {
    var newPost = {
        postTitle: req.body.postTitle,
        postAuthor: req.user.username,
        postContent: req.body.postContent,
        postDate: new Date()
    };
    dbPosts.Post.create(newPost, function(err, result) {
        if(err) {
            console.log(err);
            res.redirect("back");
        } else {
            res.redirect("/");
        }
    });
});

app.post("/posts/:id/comments", isLoggedIn, function(req, res) {
    if(req.user.username && req.body.commentContent) {
        var newComment = {author: req.user, content: req.body.commentContent};
        dbPosts.Post.findOne({_id: req.params.id}, function(err, foundPost) {
            if(err) {
                console.log(err);
                res.redirect("back");
            } else {
                foundPost.comments.push(newComment);
                foundPost.save(function(err, result) {
                    if(err) {
                        console.log(err);
                    } else {
                        console.log("Successfully added a new comment into the post object.");                    }
                });
            }
        });
    }
    res.redirect("/posts/" + req.params.id);
});

app.delete("/posts/:id", isLoggedIn, function(req, res) {
    res.send("delete request");
});

app.get("/login", function(req, res) {
    res.render("login", {origin: "login"});
});

app.get("/logout", isLoggedIn, function(req, res) {
    req.logout();
    res.redirect("/");
});

app.post("/login", passport.authenticate("local", {
    successRedirect: '/',
    failureRedirect: '/login'
}));

app.get("/users/new", function(req, res) {
    res.render("registerForm", {origin: "register"});
});

app.post("/users", upload.single("profilePicture"), function(req, res) {
    newUser = {username: req.body.username, about: req.body.aboutuser};
    dbUsers.User.register(new dbUsers.User(newUser), req.body.password, function(err, user) {
        if(err) {
            console.log("There was an error registering the new user to the database. - " + err);
            res.redirect("/");
        } else {
            var profileNum = 0;
            fs.readdir("./public/pictures/profilepics/", function(err, files) {
                if(err) {
                    console.log(err);
                } else {
                    profileNum = files.length;
                    if(saveFile(req.file.path, "./public/pictures/profilepics/" + profileNum + ".png")) {
                        user.profilePicture = "/pictures/profilepics/" + profileNum + ".png";
                        user.save(function(err) {
                            if(err) {
                                console.log(err);
                            } else {
                                console.log("Successfully saved the new profile picture.");
                            }
                        });
                        passport.authenticate("local")(req, res, function() {
                            console.log("New user successfully registered! Data: " + user);
                            res.redirect("/");
                        });
                    } else {
                        console.log("There was a problem with picture upload.");
                    }
                }
            });
        }
    });
});

app.listen(3000, "localhost", function() {
    console.log("Server started at localhost:3000...");
});
