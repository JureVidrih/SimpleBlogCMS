import React, { Component } from 'react';

class Footer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={footerStyle}>    
                <p>This is a footer!</p>
            </div>
        );
    }
}

const footerStyle = {
    height: "100px",
    paddingTop: "25px",
    backgroundColor: "gray",
    color: "white",
    textAlign: "center"
};

export default Footer;