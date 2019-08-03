import React, { Component } from 'react';
import { NavigationBar, Footer } from '../page_sections/';
import { Posts } from '../../components';

class Home extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div style={homeStyle}>
                <NavigationBar />
                <p>This is the home page!</p>
                <Posts />
                <Footer />
            </div>
        );
    }
}

const homeStyle = {
    
}

export default Home;