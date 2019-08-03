import React, { Component } from 'react';
import Post from './Post';
import { throws } from 'assert';

class Posts extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            posts: []
        };
        
        this.postArray = [];
    }

    componentDidMount() {
        fetch("http://localhost:3001/posts").then((response) => {
            this.setState({posts: response});
        }).catch((err) => {
            console.log("There was an error fetching posts!");
        });
    }

    render() {
        if(this.state.posts.length > 0) {
            this.state.posts.forEach((elem, id, arr) => {
                this.postArray.push(<Post isPreview title={elem.postTitle} author={elem.postAuthor} postedOn={elem.originalDate} comments={elem.comments}>elem.postContent</Post>);
            });
        }

        return (<div><h3>Posts:</h3>{this.postArray}</div>);
    }
}

export default Posts;