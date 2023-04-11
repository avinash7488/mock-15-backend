const express = require("express");
const userRouter = express.Router();
const { userModel } = require("../modal/User.model");
const bcrypt= require("bcrypt");
const jwt = require("jsonwebtoken");

// userRouter.get("/", (req, res) => {
//   res.send("USER ROUTE");
// });

userRouter.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.find({ email });

  if (user.length <= 0) {
    try {
      bcrypt.hash(password, 5, async (err, hash) => {
        if (err) {
          res.send({ msg: "something went wrong", err: err.message });
        } else {
          const user = new userModel({
            email,
            password: hash,
          });
          await user.save();
          res.send({ msg: "new user has been registered" });
        }
      });
    } catch (error) {
      res.send({ msg: "something went wrong", err: err.message });
    }
  } else {
    res.send({ msg: "User Already exist, Please Login" });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.find({ email });
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, (err, result) => {
        if (result) {
          const token = jwt.sign({ UserId: user[0].id }, "masai");
          res.send({ msg: "Login Successful", token });
        } else {
          res.send({ msg: 'Invalid Credentials' });
        }
      });
    }else{
      res.send({ msg: 'User not found' });
    }
  } catch (error) {
    res.send({ msg: "Somethoing went wrong", error: error.message });
  }
});

module.exports = {
  userRouter,
};
 
