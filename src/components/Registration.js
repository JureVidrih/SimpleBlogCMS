import React, { Component } from 'react';

class Registration extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div style={registrationStyle}>
                <p>This is a sign up form.</p>
                <form action={this.props.action} method="POST">
                    <label>Username: <input required type="text" name="username" placeholder="Username here..."/></label>
                    <label>Password: <input required type="password" name="password" placeholder="Password here..."/></label>
                    <label>E-mail: <input required type="email" name="email" placeholder="Your email here..."/></label>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
            );
        }
    }
    
    const registrationStyle = {
        
    }
    
    export default Registration;