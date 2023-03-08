const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const registerUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json("Please add all fields");
  }
  const userExists = await User.findOne({ username });
  if (userExists) {
    res.status(400).json("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    password: hashedPassword,
  });
  const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  if (user) {
    res.status(201).json({ user, token });
  } else {
    res.status(400).json("Invalid user data");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(500).json("Invalid username");
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if (validPassword && user) {
    const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    return res.status(200).json({ user, token });
  } else {
    return res.status(400).json("Email or Password incorrect");
  }
});

const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

module.exports = { registerUser, authUser, getMe };
