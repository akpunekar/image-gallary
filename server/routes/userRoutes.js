const express = require("express");
const {
  registerUser,
  authUser,
  getMe,
} = require("../controllers/userControllers");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

router.post("/", registerUser);
router.post("/login", authUser);
router.get("/me", protect, getMe);

module.exports = router;
