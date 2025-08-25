const express = require("express");
const Note = require("../models/Note");
const authMiddleware = require("../middleware/authMiddleWare");

const router = express.Router();

// Get all notes
router.get("/", authMiddleware, async (req, res) => {
  try {
    const notes = await Note.find({ created_by: req.user.id });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a note
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, content, category, color } = req.body;
    const note = new Note({ created_by: req.user.id, title, content, category, color });
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a note
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, created_by: req.user.id },
      req.body,
      { new: true }
    );
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a note
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, created_by: req.user.id });
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
