/* NOTE: Comment below needed for Google API. Do not remove! */
/* Used to call google.maps API in GeoSuggest!!! */

/* global google */

import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Media from "react-media";
import Form from "react-bootstrap/Form";
import ProgressBar from "react-bootstrap/ProgressBar";
// NOTE: This import used for feedback in bootstrap4

// HelpBlock
// FormGroup
// ControlLabel

import { Auth } from "aws-amplify";
// import Geosuggest from "react-geosuggest";
import UiLoadBtn from "../components/UiLoadBtn";
import config from "../config";
// import RegistrationProgressAside from "./RegistrationProgressAside";
// import UserConfirmation from "../containers/UserConfirmation";
import "./UserRegistration.css";

export default class UserRegistration extends Component {










  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      geoCodeURL: "",
      govNumber: "",
      streetAddress: "",
      addressLine2: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      firstName: "",
      lastName: "",
      mobilePhone: "",
      email: "",
      password: "",
      confirmPassword: "",
      confirmationCode: "",
      validated: false,
      registrationStep: 0,
      newUser: null//,
      //role: ""
    };

    // NOTE: Bind the registration workflow and the suggestion selector
    this.registrationWorkFlow = this.registrationWorkFlow.bind(this);
    // this.selectSuggestion = this.selectSuggestion.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  //NOTE: When compone  nt mounts this takes over
  componentDidMount() {
    if (this.state.registrationStep.toString() === "0") {
      this.setState({
        registrationStep: 1
      });
    }
  }

  // FIXME: may need to delete or merge this into more
  //        efficient validation schemes
  // Need to make sure the form is filled in with information
  validateForm() {
    let b = false;
    // eslint-disable-next-line
    console.log("validateForm called!!!!");

    // If on step 1 && dealer has name && name is NaN && valid address
    // then bool is true
    if (this.state.registrationStep.toString() === "1") {
      if (this.state.govNumber.length > 0 &&
        isNaN(this.state.streetAddress) &&
        this.state.streetAddress) {

        b = true;
      }
    }

    //validate fields in step 2 before submitting form
    if (this.state.registrationStep.toString() === "2") {
      if (this.state.firstName.length > 0 && isNaN(this.state.firstName) &&
        this.state.lastName.length > 0 && isNaN(this.state.lastName) &&
        this.state.mobilePhone.length === 10 && !isNaN(this.state.mobilePhone)) {
        b = true;
      }
    }

    //validate fields in step 3 before submitting form
    if (this.state.registrationStep.toString() === "3") {
      if (this.state.firstName.length > 0 &&
        this.state.email.length > 0 &&
        this.state.password.length > 0 &&
        this.state.password === this.state.confirmPassword) {
        // if false then confirmation is turned off!
        b = true;
      }
    }

    // return the bool value. true if form is valid or false if 
    // the form is invalid...
    return (b);
  }

  handleChange = event => {
    this.setState({
      // using controlId change the state of the value as needed
      [event.target.id]: event.target.value
    });
  }

  // eslint-disable-next-line
  regexAddress(suggestion) {
    if (suggestion.length > 0) {
      // FIXME: When address is 1085-1087 Boylston St Regex fails at 1085-
      let result = suggestion.split(",")[0];
      return result;
    }
  }

  /*
  // eslint-disable-next-line
  zipCodeSearch = async event => {

    let formattedAddress;
    let url = this.state.geoCodeURL;

    // NOTE: FIXED THE ERROR WITH PARSING THE JSON RESPONSE
    // Need to get address data back from google
    // to pull zipcode data
    // eslint-disable-next-line
    await fetch(url)
      .then(response => response.json())
      .then(data => formattedAddress = data.results[0].formatted_address.split(", "));

    let city = formattedAddress[formattedAddress.length - 3];
    let state = formattedAddress[formattedAddress.length - 2].split(" ")[0];
    let zip = formattedAddress[formattedAddress.length - 2].split(" ")[1];
    let country = formattedAddress[formattedAddress.length - 1];

    this.setState({
      city: city,
      state: state,
      zipCode: zip,
      country: country
    });

  // 711 East Okeechobee Road, Hialeah, FL 33010, USA
  } 
  */

  /*
  selectSuggestion(suggestion) {
    try {
      this.setState({
        streetAddress: suggestion.label
      });

      let apiKey = config.Places_API_KEY;
      let result = this.regexAddress(this.state.streetAddress);

      this.setState({
        streetAddress: result
      });

      let url = "https://maps.googleapis.com/maps/api/geocode/json?address=";

      let address = this.state.streetAddress.split(" ");

      let query = "";

      for (let i = 0; i < address.length; i++) {
        if (i === (address.length - 1)) {
          query = query + address[i];
        } else {
          query = query + address[i] + "+";
        }
      }

      // build the google api url we need to get location data
      url += query + "&key=" + apiKey;

      if (url.length > 0) {
        this.setState({
          geoCodeURL: url
        });
      }

      // NOTE: call the zipCodeSearch function so that
      //       we can extract location data from google
      //       response inside of formatted_address field
      this.zipCodeSearch();

    } catch ( err ) {
      this.setState({
        streetAddress: ""
      });
    }
  } */

  handleSubmit = async event => {

    const form = event.currentTarget;

    // eslint-disable-next-line
    console.log("This is the checkValidity res: " + form.checkValidity());

    // NOTE: This will check the validity of the input
    //       fields with html5 validation tools
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    this.setState({
      validated: true
    });

    event.preventDefault();

    this.setState({
      // set button spinner state to loading
      // while we wait for async responses
      isLoading: true
    });

    try {
      // call cognito with amplify api
      const newUser = await Auth.signUp({
        username: this.state.email,
        password: this.state.password //,
        /* TODO: Add custom attributes here
        attributes: {
          role: this.state.role // custom attribute, not standard
        }
        */

      });

      this.setState({
        // set state with newUser data
        newUser
      });
    } catch ( err ) {
      // eslint-disable-next-line
      alert(err.message);
    }

    this.setState({
      // turn off loading when async complete
      isLoading: false
    });
  }

  renderProgressBar = (now) => {
    const progressBar = <ProgressBar animated
                          variant="info"
                          now={ now }
                          label={ `${now}%` } />;
    return (progressBar);
  }

  // TODO: Need functionality to handle state changes when button OnClick
  registrationWorkFlow() {
    this.setState({
      isLoading: true
    });

    if (this.state.registrationStep.toString() === "1") {
      this.setState({
        registrationStep: 2
      });
    }

    if (this.state.registrationStep.toString() === "2") {
      // FIXME: Confirm Logic
      this.setState({
        registrationStep: 3
      });
    }

    this.setState({
      isLoading: false
    });
  }

  renderStep1() {
    //let registrationStep;

    const { validated } = this.state.validated;

    /* if (this.state.registrationStep) {
      registrationStep = this.state.registrationStep.toString();
    } */

    return (
      <div>
        <Media query="(min-width: 319px) and (max-width: 567px)">
          <Container>
            <header className="hdr1">
              <h4 className="title">Register your Account</h4>
              <h5 className="tagline">Step 1: Your basic information.</h5>
            </header>

            <section id="progressBar">
              { this.renderProgressBar(5) }
            </section>

            <article className="signup">
              { /*Start Form for step 1 here!!*/ }
              <Form className="form"
                noValidate
                validated={ validated }
                onSubmit={ this.handleSubmit }>
                <p className="signup-tag">
                  <strong>Register to get access to your Wallet!</strong>
                </p>
                
                { /* This is Dealer Number (DMV Occupational License) that we verify */ }
                <Form.Group controlId="govNumber" className="gov-num">
                  <Form.Label>
                    SSN
                  </Form.Label>
                  <Form.Control type="text"
                    value={ this.state.govNumber }
                    onChange={ this.handleChange }
                    placeholder="444-77-3333"
                    required
                    minLength="9" />
                  <Form.Text className="help">
                    Your information is never shared!
                  </Form.Text>
                </Form.Group>

                { /* NOTE: Implemented Google Geocode API to confirm zipCode & city by location */ }
                <Form.Group controlId="streetAddress">
                  <Form.Label>
                    Street Address
                  </Form.Label>

                  <Form.Control type="text"
                    value={ this.state.streetAddress }
                    onChange={ this.handleChange }
                    placeholder="1234 Main St." />
                    
                  <Form.Text className="help">
                    Please provide your street Address, and include your city, state, and zip code.
                  </Form.Text>

                   {/*
                  <Geosuggest ref={ el => this._geoSuggest = el }
                    placeholder="Enter you Street Address!"
                    country="us"
                    onSuggestSelect={ this.selectSuggestion }
                    location={ new google.maps.LatLng(33.996575, -117.4068808) }
                    radius="5000000"
                    required/> */}
                </Form.Group>

                { /* This is street Address */ }
                <Form.Group controlId="addressLine2">
                  <Form.Label>
                    Suite or Unit
                  </Form.Label>
                  <Form.Control type="text"
                    value={ this.state.addressLine2 }
                    onChange={ this.handleChange }
                    placeholder="Ex: Unit #101" />
                  <Form.Text className="help">
                    Please provide a Suite or Unit number if available.
                  </Form.Text>
                </Form.Group>

                { /* UiLoadBtn Component */ }
                <UiLoadBtn block
                  onClick={ this.registrationWorkFlow }
                  size="lg"
                  disabled={ !this.validateForm() }
                  variant="primary"
                  className="nxtBtn"
                  isLoading={ this.state.isLoading }
                  text="Save Changes"
                  loadingText="Saving..." 
                />

              </Form>
              { /* Section used for credibility seal on larger screens*/ }
              <section id="logo">
                TBD - Section here
              </section>
              { /* Aside used for credibility seal on mobile devices
              <RegistrationProgressAside orgType="Test" registrationStep={ `${registrationStep}` } />*/ }
            </article>
          </Container>
        </Media>

        <Media query="(min-width: 568px)">
          <Container>
            <header className="hdr1">
              <h3 className="title">Register your Account</h3>
              <h4 className="tagline">Step 1: Basic Information about yourself.</h4>
            </header>

            <section id="progressBar">
              { this.renderProgressBar(5) }
            </section>

            <article className="signup">
              { /*Start Form for step 1 here!!*/ }
              <Form className="form"
                noValidate
                validated={ validated }
                onSubmit={ this.handleSubmit }>
                <p>
                  <strong>Please Register and get access to your Wallet!</strong>
                </p>
                
                { /* This is Dealer Number (DMV Occupational License) that we verify */ }
                <Form.Group controlId="govNumber" className="gov-num">
                  <Form.Label>
                    SSN
                  </Form.Label>
                  <Form.Control type="text"
                    value={ this.state.govNumber }
                    onChange={ this.handleChange }
                    placeholder="444-77-3333"
                    required
                    minLength="9" />
                  <Form.Text className="help">
                    Your information is never shared!
                  </Form.Text>
                </Form.Group>

                { /* NOTE: Implemented Google Geocode API to confirm zipCode & city by location */ }
                <Form.Group controlId="streetAddress">
                  <Form.Label>
                    Street Address
                  </Form.Label>

                  <Form.Control type="text"
                    value={ this.state.streetAddress }
                    onChange={ this.handleChange }
                    placeholder="1234 Main St." />

                  <Form.Text className="help">
                    Please provide your street Address.
                  </Form.Text>

                   {/*
                  <Geosuggest ref={ el => this._geoSuggest = el }
                    placeholder="Enter you Street Address!"
                    country="us"
                    onSuggestSelect={ this.selectSuggestion }
                    location={ new google.maps.LatLng(33.996575, -117.4068808) }
                    radius="5000000"
                    required/> */}
                </Form.Group>

                { /* This is street Addreess */ }
                <Form.Group controlId="addressLine2">
                  <Form.Label>
                    Suite or Unit
                  </Form.Label>
                  <Form.Control type="text"
                    value={ this.state.addressLine2 }
                    onChange={ this.handleChange }
                    placeholder="Ex: Unit #101" />
                  <Form.Text className="help">
                    Please provide a Suite or Unit number if available.
                  </Form.Text>
                </Form.Group>

                { /* UiLoadBtn Component */ }
                <UiLoadBtn block
                  onClick={ this.registrationWorkFlow }
                  size="lg"
                  disabled={ !this.validateForm() }
                  variant="primary"
                  className="nxtBtn"
                  isLoading={ this.state.isLoading }
                  text="Save Changes"
                  loadingText="Saving..." 
                />

              </Form>
              { /* Section used for credibility seal on larger screens*/ }
              <section id="logo">
                TBD - Section here
              </section>
              { /* Aside used for credibility seal on mobile devices
              <RegistrationProgressAside orgType="Test" registrationStep={ `${registrationStep}` } />*/ }
            </article>
          </Container>
        </Media>
      </div>
      );
  }

  renderStep2(oType) {
    //let registrationStep;

    /* if (this.state.registrationStep) {
      registrationStep = this.state.registrationStep.toString();
    } */

    return (
      <div>
        <header className="hdr1">
          <h1 className="title">Wallet Registration</h1>
          <h3 className="tagline">Step 2: Create your User Account</h3>
        </header>
        <section id="progressBar">
          { this.renderProgressBar(33) }
        </section>
        <div className="signup">
          { /*Start Form for step 1 here!!*/ }
          <Form className="form" onSubmit={ this.handleSubmit }>
            <p>
              <strong>Please Register As a New User</strong>
            </p>
            
            { /* This is the user's first name and middle initial */ }
            <Form.Group controlId="firstName">
              <Form.Label>
                First Name
              </Form.Label>
              <Form.Control type="text"
                value={ this.state.firstName }
                onChange={ this.handleChange }
                placeholder="Ex: Henry J." />
              <Form.Text className="help">
                Enter your first name and an optional middle initial.
              </Form.Text>
            </Form.Group>
            { /* This is the user's last name and middle initial */ }
            <Form.Group controlId="lastName">
              <Form.Label>
                Last Name
              </Form.Label>
              <Form.Control type="text"
                value={ this.state.lastName }
                onChange={ this.handleChange }
                placeholder="Ex: Jones" />
              <Form.Text className="help">
                Enter your first name and an optional middle initial.
              </Form.Text>
            </Form.Group>
            { /* This is the user's mobile phone */ }
            <Form.Group controlId="mobilePhone">
              <Form.Label>
                Mobile Phone
              </Form.Label>
              <Form.Control type="tel"
                value={ this.state.mobilePhone }
                onChange={ this.handleChange }
                placeholder="Ex: (628) 425-2790" />
              <Form.Text className="help">
                Please <strong>ONLY</strong> include your 10-digit mobile phone number without any additional characters.
              </Form.Text>
            </Form.Group>
            { /* UiLoadBtn Component */ }
            <UiLoadBtn block
              onClick={ this.registrationWorkFlow }
              size="lg"
              disabled={ !this.validateForm() }
              variant="primary"
              className="nxtBtn"
              isLoading={ this.state.isLoading }
              text="Save Changes"
              loadingText="Saving..." />
          </Form>
          { /* Section used for credibility seal on larger screens*/ }
          <section id="logo">
            TBD - Section here
          </section>
          { /* Aside used for credibility seal on mobile devices
          <RegistrationProgressAside orgType={ `${oType}` } registrationStep={ `${registrationStep}` } />*/ }
        </div>
      </div>
      );
  }

  renderStep3() {
    // eslint-disable-next-line
    let clsName;
    // let registrationStep;

    return (
      <div>
        <header className="hdr1">
          <h1 className="title">Create a User Account</h1>
          <h3 className="tagline">Step 3: Create your Login Credentials</h3>
        </header>
        <section id="progressBar">
          { this.renderProgressBar(66) }
        </section>
        <div className="signup">
          { /*Start Form for step 1 here!!*/ }
          <Form className="form" onSubmit={ this.handleSubmit }>
            <p>
              <strong>Please Register As a new User.</strong>
            </p>
            <Form.Group controlId="email">
              <Form.Label>
                Email
              </Form.Label>
              <Form.Control autoFocus
                size="lg"
                type="email"
                value={ this.state.email }
                onChange={ this.handleChange }
                required />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>
                Password
              </Form.Label>
              <Form.Control size="lg"
                type="password"
                value={ this.state.password }
                onChange={ this.handleChange }
                required />
            </Form.Group>
            <Form.Group controlId="confirmPassword">
              <Form.Label>
                Confirm Password
              </Form.Label>
              <Form.Control size="lg"
                type="password"
                value={ this.state.confirmPassword }
                onChange={ this.handleChange } />
            </Form.Group>
            { /* UiLoadBtn Component */ }
            <UiLoadBtn block
              size="lg"
              type="submit"
              disabled={ !this.validateForm() }
              variant="primary"
              className="nxtBtn"
              isLoading={ this.state.isLoading }
              text="Register"
              loadingText="Processing..." />
          </Form>
          { /* Section used for credibility seal on larger screens*/ }
          <section id="logo">
            TBD - Section here
          </section>
          { /* Aside used for credibility seal on mobile devices
          <RegistrationProgressAside orgType={ `${oType}` } registrationStep={ `${registrationStep}` } />*/ }
        </div>
      </div>
      );

  }

  /*
   *
   * @return <UserConfirmation />
   *
   * Reuturns the component that
   * will confirm a user's credentials
   *
   */

  renderConfirmationFormNew() {
    // eslint-disable-next-line
    console.log(
      "orgType: " + this.state.orgType + " " +
      "corpName: " + this.state.corpName + " " +
      "govNumber: " + this.state.govNumber + " " +
      "qatCrmId: " + this.state.qatCrmId + " " +
      "streetAddress: " + this.state.streetAddress + " " +
      "addressLine2: " + this.state.addressLine2 + " " +
      "city: " + this.state.city + " " +
      "state: " + this.state.state + " " +
      "zipCode: " + this.state.zipCode + " " +
      "country: " + this.state.country + " " +
      "firstName: " + this.state.firstName + " " +
      "lastName: " + this.state.lastName + " " +
      "title: " + this.state.title + " " +
      "officePhone: " + this.state.officePhone + " " +
      "mobilePhone: " + this.state.mobilePhone + " " +
      "username: " + this.state.username + " " +
      "email: " + this.state.email + " " +
      "password: " + this.state.password + " " +
      "password: " + this.state.confirmPassword + " " +
      "password: " + this.state.approvalCode
    );

    return ( {/*}
      <UserConfirmation orgType={ this.state.orgType }
        registrationStep={ this.state.registrationStep }
        email={ this.state.email }
        password={ this.state.password }
        isAuthenticated={ this.props.isAuthenticated }
        userHasAuthenticated={ this.props.userHasAuthenticated }
        user={ this.state } /> */}
      );
  }

  // NOTE: This is being used to get the correct workflow step
  // to render. You have to setState outside of the render
  // "canvas".
  renderForms() {
    let form;

    if (this.state.registrationStep.toString() === "1") {
      form = this.renderStep1();
    } else if (this.state.registrationStep.toString() === "2") {
      form = this.renderStep2(this.state.orgType);
    } else if (this.state.registrationStep.toString() === "3") {
      form = this.renderStep3();
    }

    return (form);

  }

  // TODO: Conditionally render each form element needed!!!
  // conditionally render the registration form or the confirmation form
  // depending on the user's registration state.
  // ? this.renderForms()
  render() {
    // eslint-disable-next-line
    console.log("THese are child props.isAuthenticated IN UR.js: " + this.props.isAuthenticated);
    // eslint-disable-next-line
    console.log("THese are child props.userHasAuthenticated IN UR.js: " + this.props.userHasAuthenticated);

    return (
      <div className="Registration">
        { this.state.newUser === null
          ? this.renderForms()
          : this.renderConfirmationFormNew() }
      </div>
      );
  }
}









