const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
    },
    password: {
      type: String,
    },
    age: {
      type: String,
    },
    gender: {
      type: String,
    },
  },
  { timestamp: true }
);

const User = mongoose.model("User", userSchema);

module.exports = { User };
