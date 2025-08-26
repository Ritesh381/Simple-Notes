const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String}], // array of options
  answer: { type: String, required: true },   // or store index if you prefer
});

const FlashCardSchema = new mongoose.Schema({
  front: { type: String, required: true },
  back: { type: String, required: true },
});

const NoteSchema = new mongoose.Schema({
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  created_at: { type: Date, default: Date.now },
  title: { type: String, required: true },
  color: { type: String },
  tags: [{ type: String }],
  content: { type: String },  // full content (maybe markdown) given by user

  desc: { type: String },     // short AI-generated markdown description
  summary: { type: String },  // markdown summary
  points: [{ type: String }], // last 5 points, easier as array of strings

  quiz: [QuizSchema],         // structured quizzes
  flash_cards: [FlashCardSchema], // structured flashcards
});

NoteSchema.index({ created_by: 1, created_at: -1 }); // find user’s notes sorted by date
NoteSchema.index({ title: "text", content: "text", tags: "text" }); // full-text search
NoteSchema.index({ tags: 1 }); // tag-based filtering

module.exports = mongoose.model("Note", NoteSchema);