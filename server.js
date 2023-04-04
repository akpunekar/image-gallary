const express = require("express");
require("dotenv").config();
const cors = require("cors");
const path = require("path");
const userRoutes = require("./routes/userRoutes");
const photoRoutes = require("./routes/photoRoutes");
const mongoose = require("mongoose");

const app = express();
const port = process.env.SERVER_PORT || 5000;
const USERS_DB = mongoose.createConnection(
  process.env.MONGODB_URI_USERS,
  (err) => {
    const PHOTOS_DB = mongoose.createConnection(process.env.MONGODB_URI_PHOTOS);
    const photoSchema = mongoose.Schema(
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
    const Photo = PHOTOS_DB.model("Photo", photoSchema);
    module.exports = Photo;

    console.log("Connected to DB");
    if (err) {
      console.error(err);
      return false;
    }
    app.listen(port, () => {
      console.log("listening on port " + port);
    });
  }
);
const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);
const User = USERS_DB.model("User", userSchema);
module.exports = User;

app.use(cors());
app.use(express.json());

/* This is how you set up routes. The first argument is the path, and the second argument is the route. */
app.use("/api/users", userRoutes);
app.use("/api/photos", photoRoutes);

app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});
