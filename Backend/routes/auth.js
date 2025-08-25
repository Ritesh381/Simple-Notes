const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config()

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  try {
    const { username, pass, name, photoLink } = req.body;
    const hashedPass = await bcrypt.hash(pass, 10);
    // check if user exists
    const existing = await User.findOne({ username });
    if (existing)
      return res.status(400).json({ message: "User already exists" });

    if (!username || !pass || !name)
      return res.status(400).json({ message: "All fields are required" });

    //create new user
    const user = new User({ username, pass: hashedPass, name, photoLink: photoLink || undefined });
    await user.save();
    res.json({ message: "User created", user });
  } catch (err) {
    res
      .status(500)
      .json({ error: err.message, message: "Internal server error" });
  }
});

//Login
router.post("/login", async (req, res) => {
  try {
    const { username, pass } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(pass, user.pass);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ message: "Login Ok", token, name:user.name, username:user.username, id:user._id });
  } catch (err) {
    res
      .status(500)
      .json({ error: err.message, message: "Internal server error" });
  }
});

module.exports = router;
