const Photo = require("../models/photoModel");

const asyncHandler = require("express-async-handler");

const getPhotos = asyncHandler(async (req, res) => {
  const photos = await Photo.find({ user: req.user._id });
  res.status(200).json(photos);
});

const uploadPhoto = asyncHandler(async (req, res) => {
  const { photoName, photoUrl } = req.body;

  if (!photoName || !photoUrl || !req.user._id) {
    res.status(400).json("Please enter Photo details");
  }

  const code = Math.random().toString(36).substring(2, 8);
  const photo = await Photo.create({
    user: req.user._id,
    photoName,
    photoUrl,
    uniqueDigit: code,
  });
  res.status(200).json(photo);
});

const deletePhoto = asyncHandler(async (req, res) => {
  const photo = await Photo.findById(req.params.id);

  if (photo && photo.user.toString() === req.user._id.toString()) {
    await photo.remove();
    res.status(200).json({ id: req.params.id });
  } else {
    res.status(404).json("Not Authorized");
  }
});

module.exports = {
  getPhotos,
  uploadPhoto,
  deletePhoto,
};
