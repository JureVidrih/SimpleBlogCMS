import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './navigationBar.css';

class NavigationBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={navigationBarStyle.navigationBar}>    
                <div style={navigationBarStyle.leftDiv}>
                    <span style={{marginRight: "20px"}}>
                        <strong>SimpleBlogCMS</strong>
                    </span>
                    
                    <NavLink exact className="navLink" to="/" activeClassName="navLinkActive">
                        Home
                    </NavLink>
                </div>
                <div style={navigationBarStyle.rightDiv}>
                    <NavLink exact className="navLink" to="/login" activeClassName="navLinkActive">
                        Login
                    </NavLink>
                    <NavLink exact className="navLink" to="/signup" activeClassName="navLinkActive">
                        Sign up
                    </NavLink>
                </div>
            </div>
        );
    }
}

const navigationBarStyle = {
    navigationBar: {
        display: "flex",
        height: "48px",
        justifyContent: "space-between",
        padding: "15px 10px",
        backgroundColor: "black",
        color: "white"
    },
    leftDiv: {
        display: "inline-block",
    },
    rightDiv: {
        display: "inline-block",
    }
};

export default NavigationBar;