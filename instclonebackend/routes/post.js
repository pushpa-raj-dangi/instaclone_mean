const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const Post = mongoose.model("Post");

router.get("/posts", (req, res) => {
  Post.find()
    .populate("postedBy", "_id name email")
    .populate("comments.postedBy", "_id name")
    .then((posts) => res.json({ posts: posts }))
    .catch((error) => console.log(error));
});

router.get("/post/:id", requireLogin, (req, res) => {
  Post.findOne({ _id: req.params.id })
    .populate("postedBy", "_id name email")
    .populate("comments.postedBy", "_id name")
    .then((posts) => {
      res.json({ posts: posts }).catch((error) => console.log(error));
    })
    .catch((error) => res.status(404).json({ error: "Post not found." }));
});

router.get("/subpost", requireLogin, (req, res) => {
  Post.find()
    .find({ postedBy: { $in: req.user.following } })
    .populate("postedBy", "_id name email")
    .populate("comments.postedBy", "_id name")
    .then((posts) => res.json({ posts: posts }))
    .catch((error) => console.log(error));
});

router.post("/createpost", requireLogin, (req, res) => {
  const { title, body, image } = req.body;
  console.log(title, body, image);
  if (!title) {
    return res.status(422).json({ error: "Title is requied." });
  }

  req.user.password = undefined;
  const post = new Post({
    title,
    body,
    photo: image,
    postedBy: req.user,
  });

  post
    .save()
    .then((restult) => {
      res.json({ post: restult });
    })
    .catch((error) => console.log(error));
});

router.get("/myposts", requireLogin, (req, res) => {
  const id = req.user._id;
  console.log(id);
  Post.find({ postedBy: id })
    .populate("PostedBy", "_id name")
    .then((mypost) => {
      res.json({ mypost });
    })
    .catch((error) => console.log("error", error));
});

router.put("/like", requireLogin, (req, res) => {
  console.log("User", { _id: req.user._id, name: req.user.name });
  Post.findByIdAndUpdate(
    req.body.postId,
    { $push: { likes: { _id: req.user._id, name: req.user.name } } },
    { new: true }
  ).exec((error, result) => {
    console.log(error);
    if (error) {
      return res.status(422).json({ error: error });
    } else {
      return res.json(result);
    }
  });
});

router.put("/unlike", requireLogin, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $pull: { likes: { _id: req.user._id, name: req.user.name } },
    },
    { new: true }
  ).exec((error, result) => {
    if (error) {
      return res.status(422).json({ error: error });
    } else {
      console.log(result);
      return res.json(result);
    }
  });
});

router.put("/comment", requireLogin, (req, res) => {
  const comment = {
    text: req.body.text,
    postedBy: req.user._id,
  };
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { comments: comment },
    },
    { new: true }
  )
    .populate("comments.postedBy", "_id name")
    .populate("postedBy", "_id name")
    .exec((error, result) => {
      if (error) res.status(422).json({ error: error });
      return res.json(result);
    });
});

router.delete("/deletepost/:postId", requireLogin, (req, res) => {
  Post.findOne({ _id: req.params.postId })
    .populate("postedBy", "_id")
    .exec((err, post) => {
      if (err || !post) return res.status(422).json({ error: err });
      if (post.postedBy._id.toString() === req.user._id.toString()) {
        post
          .remove()
          .then((res) => res.json(result))
          .catch((error) => console.log(error));
      }
    });
});
module.exports = router;
