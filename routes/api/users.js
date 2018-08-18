const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

const User = require("../../models/User");

// @route   POST api/users/register
// @desc    Register a user - create local account
// @access  Public
router.post("/register", (req, res) => {
  // verify all inputs
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { email, provider } = req.body;
  User.findOne({ email, provider }).then(user => {
    //
    if (user) {
      return res.status(400).json({ email: "Email already existed." });
    } else {
      const picture = gravatar.url(req.body.email, {
        s: "200",
        r: "pg",
        d: "mm"
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        picture,
        password: req.body.password,
        provider: req.body.provider
      });

      // hashing password using bcrypt
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => res.json(err));
        });
      });
    }
  });
});

// @route   POST api/users/login
// @desc    Login user using local account or social media services / Return JWT
// @access  Public
router.post("/login", (req, res) => {
  // Check if login method is using 3rd party services
  if (req.body.provider && req.body.provider !== "local") {
    const { email, provider_id, provider } = req.body;
    User.findOne({ email, provider_id, provider }).then(user => {
      // create new user if there is no user with given e-mail address
      if (!user) {
        console.log("Creating user..");
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          picture: req.body.provider_pic,
          provider_id: req.body.provider_id,
          provider: req.body.provider
        });

        newUser.save().then(user => {
          // create a payload to generate new JWT
          const payload = {
            id: user.id,
            name: user.name,
            picture: user.picture
          };

          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 3600 },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        });
      } else {
        // generate and return new JWT if there is a user with given e-mail address
        console.log("User found...");

        const payload = {
          id: user.id,
          name: user.name,
          picture: user.picture
        };

        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      }
    });
  } else {
    // user's logging using local account and password
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;
    const provider = req.body.provider;

    User.findOne({ email, provider }).then(user => {
      if (!user) {
        errors.email = "User not found";
        return res.status(404).json(errors);
      }

      // compare passwords hashes, if its matched generate and return new JWT
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          const payload = {
            id: user.id,
            name: user.name,
            picture: user.picture
          };

          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 3600 },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          errors.password = "Password incorrect";
          return res.status(400).json(errors);
        }
      });
    });
  }
});

// @route   GET api/users/current
// @desc    return authorized user
// @access  Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);

module.exports = router;
