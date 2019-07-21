/*
  Pay Me Now Wallet
  P2P anonymous payments
*/

import React, { Component, Fragment } from 'react'; // Added Component
// Use Link (see r-r-d docs here), for ref to home without refresh
import { /* Link, */ NavLink } from "react-router-dom";
// Import navbar component given to you by bootstrap 
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Image from "react-bootstrap/Image";
import './App.css';

// We need a component to "contain" our App
class App extends Component {
  // Need to render App container
  render() {
    return (
      // should probably discuss className syntax in article
      <div className="App container">
        <Navbar bg="light" expand="lg">
          { /* This is where the Logo is situated in the Nav bar */ }
          <Navbar.Brand as={ NavLink } to="/">
            <Image src="../../img/walletLogo.png" className="logo" responsive="true" />
          </Navbar.Brand>
          { /* This is toggle control for the responsive menu */ }
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          { /* This is the nav collapse for mobile */ }
          <Navbar.Collapse id="basic-navbar-nav">
            { /* FIXME: Need to find out how new pullRight works after the update to B4 */ }
            <Nav className="nav-in-collapse mr-sm-2">
              { /* Here are the login dropdown menu choices in the new nav bar */ }
              <NavDropdown title="CRM" id="basic-nav-dropdown">
                { this.state.isAuthenticated
                  ? <NavDropdown.Item onClick={ this.handleLogout } className="navi-link">
                      Logout
                    </NavDropdown.Item>
                  : <Fragment>
                      { /* Fragment is like placeholder component */ }
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
                    </Fragment> }
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
      );
  }
}
export default App;







