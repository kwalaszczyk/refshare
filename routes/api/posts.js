const express = require("express");
const router = express.Router();
const passport = require("passport");

const Post = require("../../models/Post");
const Profile = require("../../models/Profile");

const validatePostInput = require("../../validation/post");

// @route   GET api/posts
// @desc    Get all posts
// @access  public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostsfound: "No posts found" }));
});

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  public
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({ nopostfound: "No post found with this ID" })
    );
});

// @route   POST api/posts
// @desc    Create a post
// @access  private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const username = profile != null ? profile.username : null;
      const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        picture: req.body.picture,
        user: req.user.id,
        username: username
      });

      newPost.save().then(post => res.json(post));
    });
  }
);

// @route   DELETE api/posts/:id
// @desc    Delete the post
// @access  private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        Post.findById(req.params.id).then(post => {
          //check for post owner
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          }
          post.remove().then(() => {
            res.json({ success: true });
          });
        });
      })
      .catch(err => res.status(404).json({ postnotfound: "No post found" }));
  }
);

// @route   POST api/posts/like/:id
// @desc    Like or undo a like a post
// @access  private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(() => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            // Undo a like
            const removeIndex = post.likes
              .map(item => item.user.toString())
              .indexOf(req.user.id);

            post.likes.splice(removeIndex, 1);
            post.save().then(post => {
              res.json(post);
            });
          } else {
            post.likes.unshift({ user: req.user.id });

            post.save().then(post => res.json(post));
          }
        })
        .catch(err => res.status(404).json({ postnotfound: "No post found" }));
    });
  }
);

// @route   POST api/posts/dislike/:id
// @desc    Dislike or undo a dislike a post
// @access  private
router.post(
  "/dislike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(() => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.dislikes.filter(
              dislike => dislike.user.toString() === req.user.id
            ).length > 0
          ) {
            const removeIndex = post.dislikes
              .map(item => item.user.toString())
              .indexOf(req.user.id);

            post.dislikes.splice(removeIndex, 1);
            post.save().then(post => {
              res.json(post);
            });
          } else {
            post.dislikes.unshift({ user: req.user.id });

            post.save().then(post => res.json(post));
          }
        })
        .catch(err => res.status(404).json({ postnotfound: "No post found" }));
    });
  }
);

// @route   POST api/posts/comment/:id
// @desc    Create a comment
// @access  private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile =>
      Post.findById(req.params.id)
        .then(post => {
          const username = profile != null ? profile.username : null;
          const newComment = {
            text: req.body.text,
            name: req.body.name,
            picture: req.body.picture,
            user: req.user.id,
            username: username
          };

          post.comments.push(newComment);

          post.save().then(post => res.json(post));
        })
        .catch(err => {
          console.log(err);
          res.status(404).json({ postnotfound: "No post found" });
        })
    );
  }
);

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Delete a comment from post
// @access  private
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexist: "Comment not exists" });
        }

        const removeIndex = post.comments
          .map(comment => comment.id.toString())
          .indexOf(req.params.comment_id);

        post.comments.splice(removeIndex, 1);

        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: "No post found" }));
  }
);

module.exports = router;
