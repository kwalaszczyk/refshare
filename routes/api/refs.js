const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");

const Refs = require("../../models/Refs");

router.get(
  "/favorites/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Refs.find({ favorites: req.params.id })
      .populate("owner", ["name", "id", "username"])
      .then(folders => {
        res.json(folders);
      })
      .catch(err => res.status(404).json(err));
  }
);

router.get(
  "/home",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Refs.findOne({ owner: req.user.id, isRoot: true })
      .populate("children", [
        "isFolder",
        "children",
        "name",
        "description",
        "isPrivate",
        "favorites"
      ])
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
      .populate("children", [
        "isFolder",
        "children",
        "name",
        "description",
        "isPrivate",
        "favorites"
      ])
      .populate("owner", ["name"])
      .then(ref => {
        if (!ref) {
          errors.norefs = "There is no folder with given ID";
          return res.status(404).json(errors);
        }
        if (ref.isPrivate && ref.owner.id !== req.user.id) {
          errors.norefs = "This folder is private";
          return res.status(401).json(errors);
        }
        if (ref.owner._id != req.user.id)
          ref.children = ref.children.filter(
            child => (child.isFolder && child.isPrivate ? null : child)
          );
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

router.get(
  "/breadcrumbs/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Refs.aggregate(
      [
        { $match: { _id: mongoose.Types.ObjectId(req.params.id) } },
        {
          $graphLookup: {
            from: "refs",
            startWith: "$parent",
            connectFromField: "parent",
            connectToField: "_id",
            depthField: "depth",
            as: "parents"
          }
        }
      ],
      (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
        const parents = result[0].parents
          .map(p => ({
            name: p.name ? p.name : "root",
            id: p._id,
            depth: p.depth
          }))
          .sort((p1, p2) => p2.depth - p1.depth);
        res.json(parents);
      }
    );
  }
);

router.post(
  "/editRef/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Refs.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(ref => {
      res.json(ref);
    });
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
        if (ref.owner._id != req.user.id) {
          errors.notpermitted = "You can add refs only in folders you own";
          return res.status(401).json(errors);
        }
        if (!ref.isFolder) {
          errors.nofolder = "Ref with given ID is not a folder";
          return res.status(404).json(errors);
        }

        const newRef = new Refs({
          owner: req.user.id,
          parent: req.params.id,
          name: req.body.name,
          isFolder: req.body.isFolder,
          description: req.body.description,
          isPrivate: req.body.isPrivate
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

router.get(
  "/rootFolder/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Refs.findOne({ owner: req.params.id, isRoot: true })
      .populate("children", [
        "name",
        "_id",
        "description",
        "isFolder",
        "isPrivate",
        "favorites"
      ])
      .then(root => {
        res.json(
          root.children.filter(child => child.isFolder && !child.isPrivate)
        );
      })
      .catch(console.log);
  }
);

router.get(
  "/addFavorite/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Refs.findById(req.params.id).then(ref => {
      const alreadyFavorited = ref.favorites.find(f => f == req.user.id);
      let isAdded;
      if (!alreadyFavorited) {
        ref.favorites.push(req.user.id);
        isAdded = true;
      } else {
        ref.favorites = ref.favorites.filter(f => f != req.user.id);
        isAdded = false;
      }
      ref.save().then(res.json(isAdded));
    });
  }
);

module.exports = router;
