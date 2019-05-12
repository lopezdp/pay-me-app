/*
  Pay Me Now Wallet
  P2P anonymous payments
*/

import React, { Component } from 'react'; // Added Component
// Use Link (see r-r-d docs here), for ref to home without refresh
import { Link } from "react-router-dom";
// Import navbar component given to you by bootstrap 
import { Navbar } from "react-bootstrap";
import './App.css';

// We need a component to "contain" our App
class App extends Component {
  // Need to render App container
  render() {
    return (
      // should probably discuss className syntax in article
      <div className="App container">
        { /* Add bootstrap Navbar */ }
        { /* probably best to discuss JSX and JSX comments */ }
        { /* collapseOnSelect - Toggles expanded to false after the onSelect
                event of a descendant of a child <Nav> fires. */ }
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">
                Pay My Wallet
              </Link>
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
      </div>
      );
  }
}
export default App;
