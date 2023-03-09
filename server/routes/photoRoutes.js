const express = require("express");
const {
  getPhotos,
  uploadPhoto,
  deletePhoto,
} = require("../controllers/photoControllers");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

/* Creating a route for the getPhotos and uploadPhoto functions. */
router.route("/").get(protect, getPhotos).post(protect, uploadPhoto);
router.route("/:id").delete(protect, deletePhoto);

module.exports = router;
