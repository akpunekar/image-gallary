const express = require("express");
require("dotenv").config();
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const photoRoutes = require("./routes/photoRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/photos", photoRoutes);

/* This is a way to set the port for the server. If the port is not set in the environment, it will
default to 3001. */
const port = process.env.SERVER_PORT || 3001;
app.listen(port, () => {
  console.log("listening on port " + port);
});
