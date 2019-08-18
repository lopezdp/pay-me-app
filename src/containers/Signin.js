import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Auth } from "aws-amplify";
import "./Signin.css";

export default class Signin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      email: "",
      password: ""
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  // Use async promise to wait for response from aws-amplify api
  handleSubmit = async event => {
    event.preventDefault();

    this.setState({
      isLoading: true
    });

    // Amplify Authentication logic
    try {
      // Make call to Auth API using aws-amplify
      await Auth.signIn(this.state.email, this.state.password);
      this.props.userHasAuthenticated(true);
      this.props.history.push("/");
    } catch ( err ) {
      alert(err.message);

      this.setState({
        isLoading: false
      });
    }
  }

  render() {
    return (
      <div className="sign-in">
        <Form onSubmit={ this.handleSubmit }>
          <p>
            <strong>Returning Users Please Sign-in.</strong>
          </p>
          <Form.Group controlId="email">
            <Form.Label>
              Email address
            </Form.Label>
            <Form.Control autoFocus
              size="lg"
              type="email"
              placeholder="Enter email"
              value={ this.state.email }
              onChange={ this.handleChange } />
            <Form.Text className="text-muted">
              We will never share your private information with a third-party.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>
              Password
            </Form.Label>
            <Form.Control size="lg"
              type="password"
              placeholder="Password"
              value={ this.state.password }
              onChange={ this.handleChange } />
          </Form.Group>
          { /* FIXME: Get Remember me check working so that it grabs user email from cookie */ }
          <Form.Group controlId="rememberUser">
            <Form.Check type="checkbox" label="Remember Me" />
          </Form.Group>
          <Button block
            size="lg"
            disabled={ !this.validateForm() }
            variant="primary"
            type="submit">
            Login
          </Button>
        </Form>
      </div>
      );
  }
}