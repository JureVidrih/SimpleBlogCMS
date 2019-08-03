import React, { Component } from 'react';
import {BrowserRouter, Link, NavLink, Switch, Route} from 'react-router-dom';
import './App.css';
import { Home, Login, Signup } from './components/pages';
import { Posts } from './components';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Home }/>
          <Route exact path="/login" component={ Login }/>
          <Route exact path="/signup" component={ Signup }/>
          <Route exact path="/posts" component={ Posts }/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
