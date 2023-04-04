const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema(
  {
    photoName: { type: String, required: true },
    photoUrl: { type: String, required: true },
    uniqueDigit: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);
const Photo = mongoose.model("Photo", photoSchema);

module.exports = Photo;
