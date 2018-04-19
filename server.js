var express = require('express'), 
app = express();

var bpars = require('body-parser');

app.use(express.static("public"));
app.use(express.static("assets"));
app.use(express.static("build"));
app.use(bpars.urlencoded({extended: true}));
app.set("view engine", "ejs");

var posts = [
    {title: "Man must explore, and this is exploration at its greatest", content: "Problems look mighty small from 150 miles up", author: "Jure", originalDate: "September 12, 2007"},
    {title: "Title 2", content: "Some content.", author: "Jure", originalDate: "September 12, 2007"},
    {title: "Title 3", content: "Some content.", author: "Jure", originalDate: "September 12, 2007"},
    {title: "Title 4", content: "Some content.", author: "Jure", originalDate: "September 12, 2007"}
];

app.get("/", function(req, res) {
    res.render("landing", {origin: "landing", posts: posts});
});

app.get("/gallery", function(req, res) {
    res.render("gallery", {origin: "gallery"});
});

app.get("/posts", function(req, res) {
    res.render("partials/posts", {posts: posts});
});

app.get("/posts/new", function(req, res) {
    res.render("formNewPost", {origin: "newPost"});
});

app.post("/posts", function(req, res) {
    var postTitle = req.body.postTitle;
    var postAuthor = req.body.postAuthor;
    var postContent = req.body.postContent;
    var postDate = new Date();
    posts.push({title: postTitle, content: postContent, author: postAuthor, originalDate: postDate});
    res.redirect("/");
});

app.get("/login", function(req, res) {
    res.render("login");
});

app.get("/signup", function(req, res) {
    res.render("login");
});

app.post("/signup", function(req, res) {
    res.render("login");
});

app.listen(3000, "localhost", function() {
    console.log("Server started at localhost:3000...");
});