import React, { Component } from 'react';
import { NavigationBar, Footer } from '../page_sections/';
import { Signin } from '../../components';

class Login extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div style={loginStyle}>
                <NavigationBar />
                <p>This is the login page!</p>
                <Signin action="http://localhost/login"/>
                <Footer />
            </div>
        );
    }
}

const loginStyle = {
    
}

export default Login;