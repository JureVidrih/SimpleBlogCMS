let express = require("express");
let app = express();
let bparser = require("body-parser");
let mongoose = require("mongoose");
let multer = require("multer");

let dbusers = require("./models/dbusers");
let dbposts = require("./models/dbposts");
let dbcomments = require("./models/dbcomments");

app.use(bparser.urlencoded({extended: true}));

let db = mongoose.connect("mongodb://localhost:27017/simpleblogcms");

app.get("/", function(req, res) {
    res.send("This is the default route!");
});

app.get("/posts", function(req, res) {
    // res.json([{postTitle: "First post!",
    //     postAuthor: "Busy V",
    //     postContent: "Bla bla bla",
    //     originalDate: new Date(),
    //     comments: []}]);
    dbposts.Post.find(function(err, foundPosts) {
        if(!err) {
            res.json(foundPosts);
        } else {
            console.log("Error on GET /posts route! " + err);
        }
    });
});

app.listen(3001, "localhost", function() {
    console.log("Server now listening on localhost:3001");
});