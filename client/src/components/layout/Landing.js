import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row justify-content-md-center">
              <div className="col-md-8 text-center">
                <h1 className="main-heading brand">
                  <span className="word-color">Ref</span>
                  Share
                </h1>
                <p className="subheading">
                  {' '}
                  Create an account, catalog your links/resources, share that
                  with everybody and be part of the best social web bookmarking
                  network.
                </p>
                <Link to="/register" className="btn btn-info">
                  Sign Up
                </Link>
                <Link to="/login" className="btn btn-light">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
