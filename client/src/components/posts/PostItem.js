import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { deletePost, addLike, addDislike } from "../../actions/postsActions";

class PostItem extends Component {
  onDeleteClick(id) {
    this.props.deletePost(id);
  }
  onLikeClick(id) {
    this.props.addLike(id);
  }
  onUnlikeClick(id) {
    this.props.removeLike(id);
  }

  onDislikeClick(id) {
    this.props.addDislike(id);
  }

  findUserAction(actions) {
    const { auth } = this.props;
    return actions.filter(action => action.user === auth.user.id).length > 0
      ? true
      : false;
  }

  render() {
    const { post, auth, showActions } = this.props;
    const username = post.username == null ? "not-found" : post.username;
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-3 profile">
            <Link to={`/profile/${username}`}>
              <img className="rounded-circle" src={post.picture} alt="" />
            </Link>
            <Link to={`/profile/${username}`} className="subheading smaller">
              {post.name}
            </Link>
          </div>
          <div className="col-md-9 post">
            <p className="post-text">{post.text}</p>
            {showActions ? (
              <div>
                <button
                  onClick={this.onLikeClick.bind(this, post._id)}
                  type="button"
                  className="btn-small like"
                >
                  <i
                    className={classnames("fas fa-thumbs-up", {
                      "text-info": this.findUserAction(post.likes)
                    })}
                  />
                  <span className="badge">{post.likes.length}</span>
                </button>
                <button
                  onClick={this.onDislikeClick.bind(this, post._id)}
                  type="button"
                  className="btn-small dislike"
                >
                  <i
                    className={classnames("fas fa-thumbs-down", {
                      "text-info": this.findUserAction(post.dislikes)
                    })}
                  />
                  <span className="badge">{post.dislikes.length}</span>
                </button>
                <Link to={`/post/${post._id}`} className="comments">
                  {`Comments (${post.comments.length})`}
                </Link>
                {post.user === auth.user.id ? (
                  <button
                    onClick={this.onDeleteClick.bind(this, post._id)}
                    className="btn-small btn-delete"
                  >
                    <i className="fas fa-times" />
                  </button>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  addDislike: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deletePost, addLike, addDislike }
)(PostItem);
