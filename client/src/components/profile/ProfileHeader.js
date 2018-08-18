import React, { Component } from 'react';
import isEmpty from '../../validation/is-empty';

class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body profile-hero">
            <div className="row">
              <div className="col-12 profile-img">
                <img
                  className="rounded-circle"
                  src={profile.user.picture}
                  alt=""
                />
              </div>
            </div>
            <div>
              <h1 className="heading smaller">{profile.user.name}</h1>
              <p className="subheading smaller">
                {profile.status}
                {isEmpty(profile.company) ? null : (
                  <span> at {profile.company}</span>
                )}
              </p>
              <p className="subheading smaller">
                {isEmpty(profile.location) ? null : (
                  <span>{profile.location}</span>
                )}
              </p>
              <p className="social-links">
                {isEmpty(profile.website) ? null : (
                  <a href={profile.website} target="_blank">
                    <i className="fas fa-globe" />
                  </a>
                )}

                {isEmpty(profile.social) ? null : isEmpty(
                  profile.social.twitter
                ) ? null : (
                  <a href={profile.social.twitter} target="_blank">
                    <i className="fab fa-twitter" />
                  </a>
                )}
                {isEmpty(profile.social) ? null : isEmpty(
                  profile.social.facebook
                ) ? null : (
                  <a href={profile.social.facebook} target="_blank">
                    <i className="fab fa-facebook" />
                  </a>
                )}
                {isEmpty(profile.social) ? null : isEmpty(
                  profile.social.linkedin
                ) ? null : (
                  <a href={profile.social.linkedin} target="_blank">
                    <i className="fab fa-linkedin" />
                  </a>
                )}
                {isEmpty(profile.social) ? null : isEmpty(
                  profile.social.instagram
                ) ? null : (
                  <a href={profile.social.instagram} target="_blank">
                    <i className="fab fa-instagram" />
                  </a>
                )}
                {isEmpty(profile.social) ? null : isEmpty(
                  profile.social.youtube
                ) ? null : (
                  <a href={profile.social.youtube} target="_blank">
                    <i className="fab fa-youtube" />
                  </a>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileHeader;
