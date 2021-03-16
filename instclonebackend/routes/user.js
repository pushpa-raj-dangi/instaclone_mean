const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const { restart } = require("nodemon");
const Post = mongoose.model("Post");
const User = mongoose.model("User");

router.get("/users", requireLogin, (req, res) => {
  User.find()
    .select("-password")
    .then((user) => {
      res.json({ user });
    })
    .catch((error) => res.status(404).json({ error: "User not found." }));
});
router.get("/userBy/:id", requireLogin, (req, res) => {
  User.findOne({ _id: req.params.id })
    .select("-password")
    .then((user) => {
      if (err) return res.status(422).json({ error: err });
      res.json({ user, posts });
    })
    .catch((error) => res.status(404).json({ error: "User not found." }));
});

router.get("/user/:id", requireLogin, (req, res) => {
  User.findOne({ _id: req.params.id })
    .select("-password")
    .then((user) => {
      Post.find({ postedBy: req.params.id })
        .populate("postedBy", "_id name")
        .exec((err, posts) => {
          if (err) return res.status(422).json({ error: err });
          res.json({ user, posts });
        });
    })
    .catch((error) => res.status(404).json({ error: "User not found." }));
});

router.put("/follow", requireLogin, (req, res) => {
  User.findByIdAndUpdate(
    req.body.followId,
    {
      $push: { followers: req.user._id },
    },
    { new: true },
    (error, result) => {
      if (error) return res.status(422).json({ error: error });
      User.findByIdAndUpdate(
        req.user._id,
        {
          $push: {
            following: req.body.followId,
          },
        },
        { new: true }
      )
        .select("-password")
        .then((result) => {
          res.json({ result });
        })
        .catch((error) => {
          return res.status(422).json({ error });
        });
    }
  );
});
router.put("/unfollow", requireLogin, (req, res) => {
  User.findByIdAndUpdate(
    req.body.unfollowId,
    {
      $pull: { followers: req.user._id },
    },
    { new: true },
    (error, result) => {
      if (error) return res.status(422).json({ error: error });
      User.findByIdAndUpdate(
        req.user._id,
        {
          $pull: {
            following: req.body.unfollowId, 
          },
        },
        { new: true }
      )
        .select("-password")
        .then((result) => {
          res.json({ result });
        })
        .catch((error) => {
          return res.status(422).json({ error });
        });
    }
  );
});
module.exports = router;
