var mongoose = require('mongoose');

this.init = function() {
    this.userSchema = new mongoose.Schema({
        username: String,
        password: String,
        about: String
    });
    this.userDBModel = mongoose.model("User", this.userSchema);

    this.commentSchema = new mongoose.Schema({
        // postId: String,
        author: String,
        content: String
    });

    this.commentDBModel = mongoose.model("Comment", this.commentSchema);

    this.postSchema = new mongoose.Schema({
        postTitle: String,
        postAuthor: String,
        postContent: String,
        originalDate: String,
        // comments: [{
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "Comment"
        // }]
        comments: [this.commentSchema]
    });

    this.postDBModel = mongoose.model("Post", this.postSchema);
}

module.exports = this;