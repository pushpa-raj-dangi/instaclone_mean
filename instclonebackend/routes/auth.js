const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../keys");
const User = mongoose.model("User");
const requireLogin = require("../middleware/requireLogin");

router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(422).json({
      error: "Fields cannot be empty",
    });
  }
  User.findOne({
    email: email,
  })
    .then((savedUser) => {
      if (savedUser) {
        return res.status(422).json({
          error: "User alerdy exist with given email.",
        });
      }
      bcrypt.hash(password, 12).then((hashedpassword) => {
        const user = new User({
          name,
          email,
          password: hashedpassword,
        });

        user
          .save()
          .then((user) =>
            res.json({
              message: "User saved successfully.",
            })
          )
          .catch((error) => console.log(error));
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.send(422).json({
      error: "All fields are required.",
    });
  }
  User.findOne({
    email: email,
  })
    .then((savedUser) => {
      if (!savedUser)
        res.status(422).json({
          error: "Invalid email or password",
        });

      bcrypt.compare(password, savedUser.password).then((domMatch) => {
        if (domMatch) {
          const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
          console.log(token,"Token")
          const { _id, name, email, followers, following } = savedUser;
          
          res.json({ token, user: { _id, name, email, followers, following } });
          console.log(token,"Token",email)
        }
        res.status(422).json({
          error: "Invalid email or password",
        });
      });
    })
    .catch((error) => console.log(error));
});
module.exports = router;
