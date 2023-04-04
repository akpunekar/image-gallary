const Photo = require("../models/photosModel");

const asyncHandler = require("express-async-handler");

/* This is a function that is being exported to the router. It is using the asyncHandler function to
handle the async function. It is finding all the photos that belong to the user and returning them. */
const getPhotos = asyncHandler(async (req, res) => {
  const photos = await Photo.find({ user: req.user._id });
  res.status(200).json(photos);
});

const uploadPhoto = asyncHandler(async (req, res) => {
  const { photoName, photoUrl } = req.body;

  /* This is checking if the photoName, photoUrl, and req.user._id are not empty. If they are not
  empty, it will create a random code and create a photo with the user, photoName, photoUrl, and
  uniqueDigit. */
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
  /* Finding the photo by the id that is being passed in the params. */
  const photo = await Photo.findById(req.params.id);

  /* This is checking if the photo exists and if the user id of the photo is the same as the user id of
  the user that is logged in. If it is, it will delete the photo and return the id of the photo that
  was deleted. */
  if (photo && photo.user.toString() === req.user._id.toString()) {
    await photo.remove();
    res.status(200).json({ id: req.params.id });
  } else {
    /* Returning a status of 404 and a json object of "Not Authorized". */
    res.status(404).json("Not Authorized");
  }
});

module.exports = {
  getPhotos,
  uploadPhoto,
  deletePhoto,
};
