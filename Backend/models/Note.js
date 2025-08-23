const mongoose = require("mongoose")

const NoteSchema = new mongoose.Schema({
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  created_at: { type: Date, default: Date.now },
  title: { type: String, required: true },
  color: String,
  category: String,
  content: String
})

module.exports = mongoose.model("Note", NoteSchema)