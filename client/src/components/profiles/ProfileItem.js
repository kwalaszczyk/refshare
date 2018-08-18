import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import isEmpty from "../../validation/is-empty";

class ProfileItem extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className="card card-body profile-card">
        <div className="row">
          <div className="col-5 col-sm-2 img-profile">
            <Link to={`/profile/${profile.username}`}>
              <img
                src={profile.user.picture}
                alt=""
                className="rounded-circle"
              />
            </Link>
          </div>
          <div className="col-7 col-sm-3 profile-name">
            <Link to={`/profile/${profile.username}`}>
              <h3>{profile.user.name}</h3>
            </Link>
            <p>
              {profile.status}{" "}
              {isEmpty(profile.company) ? null : (
                <span>at {profile.company}</span>
              )}
            </p>
            <p>
              {isEmpty(profile.location) ? null : (
                <span>{profile.location}</span>
              )}
            </p>
          </div>
          <div className="col-12 col-sm-7 profile-info">
            <h4>Interests</h4>
            <ul className="list-group">
              {profile.interests.slice(0, 4).map((interest, index) => (
                <li key={index} className="list-group-item">
                  {interest}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
