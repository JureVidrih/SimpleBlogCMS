import React, { Component } from 'react';

class Signin extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div style={signinStyle}>
                <p>This is a login form.</p>
                <form action={this.props.action} method="POST">
                    <label>Username: <input required type="text" name="username" placeholder="Username here..."/></label>
                    <label>Password: <input required type="password" name="password" placeholder="Password here..."/></label>
                    <input type="submit" value="Login"/>
                </form>
            </div>
            );
        }
    }
    
    const signinStyle = {
        
    }
    
    export default Signin;