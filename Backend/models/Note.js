const mongoose = require("mongoose")

const NoteSchema = new mongoose.Schema({
  id:{ type: mongoose.Schema.Types.ObjectId, auto: true },
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  created_at: { type: Date, default: Date.now },
  title: { type: String, required: true },
  content: String,
  category: String,
  color: String
})

module.exports = mongoose.model("Note", NoteSchema)