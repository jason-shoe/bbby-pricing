import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Product from './pages/product.js'
import Navigation from './pages/navigation.js'
import NavigationTarget from './pages/navigationTarget.js'
import {
  HashRouter,
  Route
} from "react-router-dom";

class App extends Component {
  componentDidMount(){
    document.title = "Jason Xu";
  }
  render() {
    return (
      <HashRouter basename="/" hashType="slash">
          <Route exact path="/" component={Navigation} />
          <Route exact path="/Target" component={NavigationTarget} />
      </HashRouter>
    )
  }
}

export default App;
