const express = require("express");
require("dotenv").config();
const cors = require("cors");
const path = require("path");
const userRoutes = require("./routes/userRoutes");
const photoRoutes = require("./routes/photoRoutes");
const mongoose = require("mongoose");

const port = process.env.SERVER_PORT || 5000;
const app = express();

mongoose.connect(process.env.MONGODB_URI, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Server Running On ${mongoose.connection.host}`);

  app.listen(port, () => {
    console.log("listening on port " + port);
  });
});

app.use(cors());
app.use(express.json());

/* This is how you set up routes. The first argument is the path, and the second argument is the route. */
app.use("/api/users", userRoutes);
app.use("/api/photos", photoRoutes);

app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});
