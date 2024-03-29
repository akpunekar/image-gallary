const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/usersModel");

/* The below code is a middleware function that is used to protect routes. */
const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization.startsWith("Bearer") &&
    req.headers.authorization
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401).json("Not Authorized");
    }
  }

  if (!token) {
    res.status(401).json("Not authorized, no token");
  }
});

module.exports = { protect };
