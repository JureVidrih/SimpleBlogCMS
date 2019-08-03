import React, { Component } from 'react';
import { NavigationBar, Footer } from '../page_sections/';
import { Registration } from '../../components';

class Login extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div style={loginStyle}>
                <NavigationBar />
                <p>This is the sign up page!</p>
                <Registration></Registration>
                <Footer />
            </div>
        );
    }
}

const loginStyle = {
    
}

export default Login;