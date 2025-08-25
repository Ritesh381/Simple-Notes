const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  pass: { type: String, required: true },
  photoLink: {
    type: String,
    default:
      "https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-512.png",
  },
  customCat: { type: [String], default: [] },
});

module.exports = mongoose.model("User", userSchema);
