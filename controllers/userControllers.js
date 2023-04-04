const User = require("../server");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const registerUser = asyncHandler(async (req, res) => {
  const { username, password, confirmPassword } = req.body;
  /* This is checking if the username or password is empty. If it is, it will return a 400 status code
 and a message saying "Please add all fields". */
  if (!username || !password) {
    return res.status(400);
    throw new Error("Enter All Fields");
  }

  /* This is checking if the username already exists in the database. If it does, it will return a 400
 status code and a message saying "User already exists". */
  const userExists = await User.findOne({ username });

  if (userExists) {
    res.status(400);
    throw new Error("User Already Exist");
  }

  /* This is hashing the password and creating a new user. */
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    password: hashedPassword,
  });

  /* This is creating a token for the user. */
  const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  if (user) {
    res.status(201).json({ user, token });
  } else {
    /* This is returning a 400 status code and a message saying "Invalid user data". */
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  /* This is checking if the username exists in the database. If it doesn't, it will return a 500
  status code and a message saying "Invalid username". */
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(500).json("Invalid username");
  }

  /* This is checking if the password is valid. If it is, it will create a token for the user. */
  const validPassword = await bcrypt.compare(password, user.password);
  if (validPassword && user) {
    const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    return res.status(200).json({ user, token });
  } else {
    /* Returning a 400 status code and a message saying "Email or Password incorrect". */
    return res.status(400).json("Email or Password incorrect");
  }
});

module.exports = { registerUser, authUser };
