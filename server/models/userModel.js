const mongoose = require("mongoose");
const USERS_DB = mongoose.createConnection(process.env.MONGODB_URI_USERS);
const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const User = USERS_DB.model("User", userSchema);

module.exports = User;
