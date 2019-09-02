/*
  myPay Wallet
  P2P anonymous payments
*/

import React, { Component, Fragment } from 'react'; // Added Component
import { Auth } from "aws-amplify";
// Use Link (see r-r-d docs here), for ref to home without refresh
// Import navbar component given to you by bootstrap 
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router";
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

  async componentDidMount() {
    try {
      await Auth.currentSession();
      this.userHasAuthenticated(true);
    }
    catch(e) {
      if(e !== 'No current user'){
        alert(e);
      }
    }

    this.setState({ isAuthenticating: false });
  }

  userHasAuthenticated = authenticated => {
    this.setState({
      isAuthenticated: authenticated
    });
  }

  // Update authentication state on signout event
  handleSignOut = async event => {
    await Auth.signOut();
    this.userHasAuthenticated(false);
    this.props.history.push("/signin");
  }

  // Need to render App container
  render() {

    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };

    return (
      !this.state.isAuthenticating &&
      // should probably discuss className syntax in article
      <div className="App container">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand as={ NavLink } to="/">
            MyPay Wallet
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            { this.state.isAuthenticated
              ? <NavDropdown.Item onClick={ this.handleSignOut } className="navi-link">
                  Sign Out
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
                    to="/signin"
                    className="navi-link"
                    exact>
                    Login
                  </Nav.Link>
                </Fragment> }
          </Navbar.Collapse>
        </Navbar>
        <Routes childProps={ childProps } />
      </div>
      );
  }
}
export default withRouter(App);


