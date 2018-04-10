var express = require('express'), 
app = express();

var bpars = require('body-parser');

app.use(express.static("public"));
app.use(express.static("assets"));
app.use(express.static("build"));
app.use(bpars.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.send("Test!");
});

app.listen(3000, "localhost", function() {
    console.log("Server started at localhost:3000...");
});