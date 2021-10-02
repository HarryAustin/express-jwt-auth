const { Schema, model } = require("mongoose");

const user = new Schema({
  username: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  token: String,
});

const User = model("user", user);

module.exports = User;
