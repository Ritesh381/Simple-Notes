const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const authRoutes = require("./routes/auth");
const noteRoutes = require("./routes/notes");
const cors = require("cors");
const startWorker = require("./jobs/aiWorker");

const PORT = process.env.PORT || 8080;
const app = express();

// Middleware to log requests
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${
        res.statusCode
      } ${duration}ms from ${req.ip}`
    );
  });
  next();
});

// CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173", // local React dev
      "https://simp-notes.vercel.app", // deployed frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/api/notes", noteRoutes);
app.use("/api/auth", authRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    startWorker();
  })
  .catch((err) => console.error("❌ Mongo Error:", err));

// Root endpoint
app.get("/", async (req, res) => {
  console.log("Root endpoint accessed");
  res.send("Backend running with MongoDB connected");
});

// Error handler
app.use((err, req, res, next) => {
  console.error(
    `[${new Date().toISOString()}] ❌ ERROR ${req.method} ${
      req.originalUrl
    } from ${req.ip}: ${err.stack}`
  );
  res.status(500).json({ error: err.message });
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
