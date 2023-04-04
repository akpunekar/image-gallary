const express = require("express");
require("dotenv").config();
const cors = require("cors");
const path = require("path");
const userRoutes = require("./routes/userRoutes");
const photoRoutes = require("./routes/photoRoutes");
const connectDb = require("./config/connectDB");

connectDb();
const app = express();
const port = process.env.SERVER_PORT || 5000;

app.use(cors());
app.use(express.json());

/* This is how you set up routes. The first argument is the path, and the second argument is the route. */
app.use("/api/users", userRoutes);
app.use("/api/photos", photoRoutes);

app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(port, () => {
  console.log("listening on port " + port);
});
