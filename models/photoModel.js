/* Creating a schema for the photos collection. */
const mongoose = require("mongoose");

const PHOTOS_DB = mongoose.createConnection(process.env.MONGODB_URI_PHOTOS);
const photoSchema = mongoose.Schema(
  {
    photoName: { type: String, required: true },
    photoUrl: { type: String, required: true },
    uniqueDigit: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  },
  { timestamps: true }
);
const Photo = PHOTOS_DB.model("Photo", photoSchema);
module.exports = Photo;
