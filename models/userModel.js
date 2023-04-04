const mongoose = require("mongoose");
const { app } = require("./server");

const port = process.env.SERVER_PORT || 5000;
const USERS_DB = mongoose
  .createConnection(process.env.MONGODB_URI_USERS)
  .then((err) => {
    console.log(err);
    app.listen(port, () => {
      console.log("listening on port " + port);
    });
  });
const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);
const User = USERS_DB.model("User", userSchema);
module.exports = User;
