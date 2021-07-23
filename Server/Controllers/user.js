const catchAsync = require("../Utils/catchAsync");
const db = require("../db");
const generateToken = require("../Utils/generateToken");
const User = require("../Models/user");
const { validationResult } = require("express-validator");

module.exports.login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;
  let error = validationResult(req);
  if (!error.isEmpty()) {
    res.status(400).send(error);
    return;
  }

  const user = await User.findOne({ username });

  if (user === null || user === undefined) {
    error.login = "Username or password is incorrect!";
    res.send(error);
    return;
  }

  if (!user.comparePassword(password)) {
    error.login = "Username or password is incorrect!";
    res.send(error);
    return;
  }

  const token = generateToken(user._id, user.username, user.email);

  res.header("authorization", `Bearer ${token}`);

  res.status(200).send({
    user: { username: user.username, email: user.email, user_id: user._id },
  });
});

module.exports.register = catchAsync(async (req, res, next) => {
  const { username, email, password } = req.body;
  const error = validationResult(req);
  if (!error.isEmpty()) {
    res.status(400).send(error);
    return;
  }

  const newUser = new User({ username, password, email });
  await newUser.save();

  const token = generateToken(newUser._id, newUser.username, newUser.email);

  res.header("authorization", `Bearer ${token}`);
  res.status(200).send({
    user: {
      username: newUser.username,
      email: newUser.email,
      user_id: newUser._id,
    },
  });
});
