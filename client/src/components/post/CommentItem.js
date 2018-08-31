import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteComment } from "../../actions/postsActions";
import { Link } from "react-router-dom";

class CommentItem extends Component {
  onDeleteClick(postId, commentId) {
    this.props.deleteComment(postId, commentId);
  }

  render() {
    const { comment, postId, auth } = this.props;
    const username = comment.username == null ? "not-found" : comment.username;
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-3 profile">
            <Link to={`/profile/${username}`}>
              <img className="rounded-circle" src={comment.picture} alt="" />
            </Link>
            <Link to={`/profile/${username}`} className="subheading smaller">
              {comment.name}
            </Link>
          </div>
          <div className="col-md-9 post">
            <p className="post-text">{comment.text}</p>
            {comment.user === auth.user.id ? (
              <button
                onClick={this.onDeleteClick.bind(this, postId, comment._id)}
                className="btn-small btn-delete"
              >
                <i className="fas fa-times" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {
    deleteComment
  }
)(CommentItem);
