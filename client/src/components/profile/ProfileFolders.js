import React, { Component } from "react";
import { connect } from "react-redux";
import { getRootFolderByUserId } from "../../actions/profileActions";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import FolderSharedIcon from "@material-ui/icons/FolderShared";
import Spinner from "../common/Spinner";

class ProfileFolders extends Component {
  componentDidMount() {
    const { user } = this.props.profile.profile;
    this.props.getRootFolderByUserId(user._id);
  }

  render() {
    const { folders } = this.props.profile;
    let folderContent;
    if (folders == null) {
      folderContent = <Spinner />;
    } else {
      folderContent = folders.map(f => (
        <div key={f._id} className="card card-body mb-2 repo">
          <div className="row">
            <div className="col-md-6">
              <h4 className="subheading smaller">
                <FolderSharedIcon />
                <Link to={`/folder/${f._id}`}>{f.name}</Link>
              </h4>
              <p>{f.description}</p>
            </div>
            <div />
          </div>
        </div>
      ));
    }

    return (
      <div className="profile-section">
        <h3 className="heading smaller">Shared folders</h3>
        {folderContent}
      </div>
    );
  }
}

ProfileFolders.propTypes = {
  profile: PropTypes.object.isRequired,
  getRootFolderByUserId: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getRootFolderByUserId }
)(ProfileFolders);
