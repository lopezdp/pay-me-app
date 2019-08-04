/*
  myPay Wallet
  P2P anonymous payments
*/

import React, { Component } from 'react'; // Added Component
// Use Link (see r-r-d docs here), for ref to home without refresh
// Import navbar component given to you by bootstrap 
import { NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Routes from "./Routes";
import './App.css';

// We need a component to "contain" our App
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false
    };
  }

  userHasAuthenticated = authenticated => {
    this.setState({
      isAuthenticated: authenticated
    });
  }

  // Need to render App container
  render() {

    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };

    return (
      // should probably discuss className syntax in article
      <div className="App container">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand as={ NavLink } to="/">
            MyPay Wallet
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="navigate">
              <Nav.Link as={ NavLink }
                to="/register"
                className="navi-link"
                exact>
                Register
              </Nav.Link>
              <Nav.Link as={ NavLink }
                to="/login"
                className="navi-link"
                exact>
                Login
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes />
      </div>
      );
  }
}
export default App;





