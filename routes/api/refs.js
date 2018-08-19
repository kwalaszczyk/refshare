const express = require("express");
const router = express.Router();
const passport = require("passport");

const Refs = require("../../models/Refs");
const User = require("../../models/User");

router.get(
  "/home",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Refs.find({ owner: req.user.id, isRoot: true })
      .then(ref => {
        if (!ref) {
          errors.norefs = "There is no links for this user";
          return res.status(404).json(errors);
        }
        res.json(ref);
      })
      .catch(err => res.status(404).json(err));
  }
);

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Refs.findById(req.params.id)
      .then(ref => {
        if (!ref) {
          errors.norefs = "There is no folder with given ID";
          return res.status(404).json(errors);
        }
        res.json(ref);
      })
      .catch(err => res.status(404).json(err));
  }
);

router.post(
  "/addRef/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    //@TODO: validate

    Refs.findById(req.params.id)
      .then(ref => {
        if (ref.owner != req.user.id) {
          errors.notpermitted = "You can add refs only in folders you own";
          return res.status(401).json(errors);
        }
        if (!ref.isFolder) {
          errors.nofolder = "Ref with given ID is not a folder";
          return res.status(404).json(errors);
        }
        console.log(req.body);
        const newRef = new Refs({
          owner: req.user.id,
          name: req.body.name,
          value: req.body.value,
          isFolder: req.body.isFolder,
          parent: req.params.id
        });

        newRef.save().then(newRef => {
          ref.children.push(newRef);
          ref.save().then(ref => res.json(ref));
        });
      })
      .catch(err =>
        res.status(404).json({ error: "Error during adding new ref" })
      );
  }
);

module.exports = router;
