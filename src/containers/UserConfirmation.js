import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import ProgressBar from "react-bootstrap/ProgressBar";
import { Auth } from "aws-amplify";
import UiLoadBtn from "../components/UiLoadBtn";
import config from "../config";
// import RegistrationProgressAside from "./RegistrationProgressAside";
import "./UserConfirmation.css";
import { API } from "aws-amplify";
import { s3Upload } from "../libs/awsLib";

export default class UserConfirmation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      confirmationCode: "",
      registrationStep: 0
    };
  }

  // NOTE: Handle initial mount of component
  componentDidMount() {
    // TODO:  && this.props.registrationStep.toString() === "3"
    if (this.state.registrationStep.toString() === "0" && this.props.registrationStep.toString() === "3") {
      // eslint-disable-next-line
      console.log("This is state: " + this.state.registrationStep);
      // eslint-disable-next-line
      console.log("This is props: " + this.props.registrationStep);
      this.setState({
        registrationStep: 4
      });
    }
  }

  // NOTE: This validates user entry!!!
  validateConfirmationForm() {
    return (this.state.confirmationCode.length > 0);
  }

  handleChange = event => {
    this.setState({
      // using controlId change the state of the value as needed
      [event.target.id]: event.target.value
    });
  }

  // FIXME: Need to create this in confirmation components!!!!
  // TODO: Refactor this into the new component
  handleConfirmationSubmit = async event => {
    event.preventDefault();

    this.setState({
      // On submit button will show as loading
      isLoading: true
    });

    try {
      await Auth.confirmSignUp(this.props.email, this.state.confirmationCode);
      await Auth.signIn(this.props.email, this.props.password);

      // NOTE: These props are passed down from App.js
      this.props.userHasAuthenticated(true);

      // NOTE: this was eliminated to handle it on parent component
      this.props.history.push("/");

    } catch ( err ) {
      // eslint-disable-next-line
      alert(err.message);
      this.setState({
        isLoading: false
      });
    }

    /* TODO: This is where we need to make async call to the
       *    v2.crm-users-api serverless + microservice!!!
       */

    // FIXME: Push All Data to backend here
    // Data needs: UserName...
    /*             different sort key??
    try {

      const attachment = this.file
        ? await s3Upload(this.file)
        : null;

      await this.createNewUser({
        attachment,
        govNumber: this.props.user.govNumber,
        streetAddress: this.props.user.streetAddress,
        firstName: this.props.user.firstName,
        lastName: this.props.user.lastName,
        mobilePhone: this.props.user.mobilePhone,
        email: this.props.user.email
        //role: this.props.user.role
      });

    } catch ( err ) {
      // this is catching second try statement
      // eslint-disable-next-line
      alert("2nd Try Alert in confirm submit: " + err.message);

      this.setState = {
        isLoading: false
      };
    }

    */

  }

  renderProgressBar = (now) => {
    const progressBar = <ProgressBar animated
                          variant="info"
                          now={ now }
                          label={ `${now}%` } />;
    return (progressBar);
  }

  /* Function that call backend user endpoint to post new user to db
  createNewUser(user) {
    return API.post("users", "/users", {
      body: user
    });
  }*/






  // mas o menos
  // confirm form needs:
  // label for code
  // code input field
  // help block to check email for code
  // UiLoadBtn with text="Verify" etc on Load
  renderConfirmationForm() {
    // eslint-disable-next-line
    let clsName;
    //let registrationStep;

    return (
      <div>
        <header className="hdr1">
          <h4 className="title">Confirm your User Account</h4>
          <h5 className="tagline">Step 4: Protect your Login Credentials</h5>
        </header>

        <section id="progressBar">
          { this.renderProgressBar(95) }
        </section>

        <div className="signup">
          <Form className="form" onSubmit={ this.handleConfirmationSubmit }>
            <p>
              <strong>Please Enter Your Confirmation Code.</strong>
            </p>
            <Form.Group controlId="confirmationCode">
              <Form.Label>
                Confirmation Code
              </Form.Label>
              <Form.Control autoFocus
                size="lg"
                type="tel"
                value={ this.state.confirmationCode }
                onChange={ this.handleChange } />
              <Form.Text className="text-muted">
                Please check your email for the code we sent you.
              </Form.Text>
            </Form.Group>
            { /* UiLoadBtn Component */ }
            <UiLoadBtn block
              size="lg"
              disabled={ !this.validateConfirmationForm() }
              variant="primary"
              type="submit"
              isLoading={ this.state.isLoading }
              text="Verify"
              loadingText="Verifying..." />
          </Form>
          { /* Section used for credibility seal on larger screens*/ }
          <section id="logo">
            TBD - Section here
          </section>
          { /* Aside used for credibility seal on mobile devices
          <RegistrationProgressAside orgType={ `${oType}` } registrationStep={ `${registrationStep}` } /> */ }
        </div>
      </div>

      );
  }

  render() {
    // eslint-disable-next-line
    console.log(
      "confirmationCode: " + this.state.confirmationCode + " " +
      "email: " + this.props.email + " " +
      "password: " + this.props.password);
    return (
      <div className="Registration">
        { this.renderConfirmationForm() }
      </div>
      );
  }
}
