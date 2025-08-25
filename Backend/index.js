const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const authRoutes = require("./routes/auth");
const noteRoutes = require("./routes/notes");
const cors = require("cors");

const PORT = process.env.PORT || 8080;
const app = express();

// Path to log file
const logFile = path.join(__dirname, "log.txt");

// Function to log messages
function logEvent(message) {
  const timestamp = new Date().toISOString();
  const logMsg = `[${timestamp}] ${message}\n`;
  fs.appendFileSync(logFile, logMsg, "utf8");
  console.log(message); // still logs in console too
}

// Middleware to log requests
app.use((req, res, next) => {
  logEvent(`${req.method} ${req.url} from ${req.ip}`);
  next();
});


app.use(cors({
  origin: [
   "*"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
}));

app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/notes", noteRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    logEvent("✅ Connected to MongoDB");
  })
  .catch((err) => {
    logEvent("❌ Mongo Error: " + err);
  });

app.get("/", (req, res) => {
  res.send("Backend running with MongoDB connected");
  logEvent("Root endpoint accessed");
});

// Error handler (logs errors)
app.use((err, req, res, next) => {
  logEvent(`❌ Error: ${err.message}`);
  res.status(500).json({ error: err.message });
});

// Start server
app.listen(PORT, () => {
  logEvent(`🚀 Server running on port ${PORT}`);
});
