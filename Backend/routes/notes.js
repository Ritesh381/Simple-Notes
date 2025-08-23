const express = require("express");
const Note = require("../models/Note");

const router = express.Router();

// Get all notes by user
router.post("/notes", async (req, res) => {
  try {
    const { user } = req.body;
    if (!user || !user.id) {
      return res.status(400).json({ message: "User ID required" });
    }

    const notes = await Note.find({ created_by: user.id });
    res.status(200).json({ success: true, notes });
  } catch (err) {
    res.status(500).json({ error: err.message, message: "Internal server error" });
  }
});

// Create new note
router.post("/createNote", async (req, res) => {
  try {
    const { created_by, title, content, category, color } = req.body;

    if (!created_by || !title || !content || !category || !color) {
      return res.status(400).json({ message: "Invalid note" });
    }

    const newNote = new Note({ created_by, title, content, category, color });
    await newNote.save();

    res.status(201).json({
      success: true,
      message: "Note saved successfully",
      note: newNote,
    });
  } catch (err) {
    res.status(500).json({ error: err.message, message: "Internal server error" });
  }
});

router.put("/note/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const note = await Note.findOneAndUpdate(
    { id: id, created_by: req.user.id },
    req.body,
    { new: true }
  );
  if (!note) return res.status(404).json({ message: "Note not found" });
  res.json(note);
});

router.delete("/note/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const note = await Note.findOneAndDelete({ id: id, created_by: req.user.id });
  if (!note) return res.status(404).json({ message: "Note not found" });
  res.json({ message: "Note deleted" });
});


module.exports = router;
