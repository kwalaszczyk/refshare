import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";
import { GoogleLogin } from "react-google-login";
import axios from "axios";
import FacebookLogin from "react-facebook-login";
import { FaFacebook, FaGoogle } from "react-icons/fa";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.signup = this.signup.bind(this);
  }

  async signup(res, type) {
    let userData = "test";
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

  onChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
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

  onSubmit(ev) {
    ev.preventDefault();

    const loginUser = {
      email: this.state.email,
      password: this.state.password,
      provider: "local"
    };

    this.props.loginUser(loginUser);
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
      <div className="login custom-template">
        <div className="container">
          <div className="row">
            <div className="col-md-4 m-auto">
              <h1 className="heading text-center">Log in</h1>
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
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                />
                <TextFieldGroup
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
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

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
