import React, { Component } from "react";
import { getFavoriteFolders } from "../../actions/profileActions";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import FolderSharedIcon from "@material-ui/icons/FolderShared";
import Spinner from "../common/Spinner";
import FavoriteIcon from "@material-ui/icons/Favorite";

class ProfileFavorites extends Component {
  componentDidMount() {
    const { user } = this.props.profile.profile;
    this.props.getFavoriteFolders(user._id);
  }
  render() {
    const { favorites } = this.props.profile;
    let favoritesContent;
    if (favorites == null) {
      favoritesContent = <Spinner />;
    } else {
      favoritesContent = favorites.map(f => (
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
      <div>
        <div className="profile-section">
          <h4 className="heading smaller">
            <FavoriteIcon style={{ color: "red" }} />
            Favorite folders
            <FavoriteIcon style={{ color: "red" }} />
          </h4>
          {favoritesContent}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getFavoriteFolders }
)(ProfileFavorites);
