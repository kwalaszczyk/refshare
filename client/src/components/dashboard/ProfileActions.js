import React from 'react';
import { Link } from 'react-router-dom';

const ProfileActions = () => {
  return (
    <div className="text-center">
      <Link to="/edit-profile" className="btn btn-info">
        <i className="fas fa-user-circle" /> Edit Profile
      </Link>
    </div>
  );
};
export default ProfileActions;
