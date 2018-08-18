import React, { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "../../validation/is-empty";

class ProfileAbout extends Component {
  render() {
    const { profile } = this.props;

    const firstName = profile.user.name.trim().split(" ")[0];
    const interests = profile.interests.map((interest, index) => (
      <li key={index} className="list-group-item">
        {interest}
      </li>
    ));

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body profile-about">
            <h3 className="heading">
              {firstName}
              's Bio
            </h3>
            <p>
              {isEmpty(profile.bio) ? (
                <span>{firstName} does not have a bio</span>
              ) : (
                <span>{profile.bio}</span>
              )}
            </p>
            <hr />
            <h3 className="heading">Interests</h3>
            <div className="row">
              <ul className="list-group">{interests}</ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};
export default ProfileAbout;
