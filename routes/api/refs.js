const express = require("express");
const router = express.Router();
const passport = require("passport");

const Refs = require("../../models/Refs");

router.get(
  "/home",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Refs.findOne({ owner: req.user.id, isRoot: true })
      .populate("children", ["isFolder", "children", "name"])
      .populate("owner", ["name"])
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
      .populate("children", ["isFolder", "children", "name"])
      .populate("owner", ["name"])
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

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Refs.findByIdAndRemove(req.params.id).then(deletedRef => {
      Refs.findById(deletedRef.parent).then(
        parent =>
          (parent.children = parent.children.filter(children => {
            children._id !== deletedRef._id;
          }))
      );
    });
    res.json({ success: true });
  }
);

router.post(
  "/editRef/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Refs.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(ref =>
      res.json(ref)
    );
  }
);

router.post(
  "/addRef/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    //@TODO: validate

    Refs.findById(req.params.id)
      .populate("children", "name")
      .then(ref => {
        if (ref.owner != req.user.id) {
          errors.notpermitted = "You can add refs only in folders you own";
          return res.status(401).json(errors);
        }
        if (!ref.isFolder) {
          errors.nofolder = "Ref with given ID is not a folder";
          return res.status(404).json(errors);
        }

        const newRef = new Refs({
          owner: req.user.id,
          name: req.body.name,
          isFolder: req.body.isFolder,
          parent: req.params.id
        });

        newRef.save().then(newRef => {
          ref.children.push(newRef);
          ref.save().then(ref => res.json(newRef));
        });
      })
      .catch(err =>
        res.status(404).json({ error: "Error during adding new ref" })
      );
  }
);

module.exports = router;
