import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser, loginUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";
import { GoogleLogin } from "react-google-login";
import axios from "axios";
import FacebookLogin from "react-facebook-login";
import { FaFacebook, FaGoogle } from "react-icons/fa";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  async signup(res, type) {
    let userData;
    if (type === "google" && res.w3.U3) {
      userData = {
        name: res.w3.ig,
        provider: type,
        email: res.w3.U3,
        provider_id: res.El,
        token: res.Zi.access_token,
        provider_pic: res.w3.Paa,
        tokenObject: res.tokenObj
      };
    } else if (type === "facebook") {
      const fbResponse = await axios.get(
        `https://graph.facebook.com/${res.userID}/picture?width=300`
      );
      userData = {
        name: res.name,
        provider: type,
        email: res.email,
        provider_id: res.userID,
        token: res.access_token,
        provider_pic: fbResponse.request.responseURL
      };
    }
    if (userData) {
      this.props.loginUser(userData);
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  onSubmit(ev) {
    ev.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      provider: "local"
    };

    this.props.registerUser(newUser, this.props.history);
  }

  response = response => {
    if (response.error == null) this.signup(response, "google");
  };

  responseFacebook = response => {
    this.signup(response, "facebook");
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="register custom-template">
        <div className="container">
          <div className="row">
            <div className="col-md-5 m-auto">
              <h1 className="heading">Sign Up</h1>
              <p className="subheading">
                Create your <span className="word-color">Ref</span>
                Share account
              </p>
              <GoogleLogin
                clientId="491877697119-agnjghcju84pbj82ae1epo557ev1rsd7.apps.googleusercontent.com"
                className="col-md-12 btn-auth google"
                onSuccess={this.response}
                onFailure={this.response}
              >
                <FaGoogle />
                <span> Login with Google</span>
              </GoogleLogin>
              <FacebookLogin
                appId="560425361071859"
                size="medium"
                fields="name,email,picture"
                cssClass="col-md-12 btn-auth fb"
                callback={this.responseFacebook}
                icon={<FaFacebook />}
              />
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                />
                <TextFieldGroup
                  placeholder="Email"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                />
                <TextFieldGroup
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                />
                <TextFieldGroup
                  placeholder="Confirm Password"
                  name="password2"
                  type="password"
                  value={this.state.password2}
                  onChange={this.onChange}
                  error={errors.password2}
                />
                <input type="submit" className="btn btn-info" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser, loginUser }
)(withRouter(Register));
