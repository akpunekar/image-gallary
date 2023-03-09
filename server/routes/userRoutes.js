const express = require("express");
const { registerUser, authUser } = require("../controllers/userControllers");
const router = express.Router();
// const { protect } = require("../middleware/authMiddleware");

/* Creating a route for the user to register, login, and get their information. */
router.post("/", registerUser);
router.post("/login", authUser);

module.exports = router;
