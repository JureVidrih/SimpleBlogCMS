import React, { Component } from 'react';

class Post extends Component {
    constructor(props) {
        super(props);
        this.isPreview = props.isPreview;
        this.author = props.author;
        this.title = props.title;
        this.comments = props.comments;
        this.postedOn = props.postedOn;
    }

    render() {
        if(this.isPreview) {
            return (
                <div style={postStyle.post}>
                    <h6>{this.title} by {this.author} on {this.postedOn}</h6>
                    <p>{this.children}</p>
                    <p>Comments({this.comments.length})</p>
                </div>
            );
        }
    }
}

const postStyle = {
    post: {
        
    }
}

export default Post;