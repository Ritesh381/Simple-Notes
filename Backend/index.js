const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const authRoutes = require("./routes/auth");
const cors = require("cors");

const PORT = process.env.PORT || 8080;
app = express();
app.use(cors({
  origin: [
    "http://localhost:5173",       // React dev server
    "https://simp-notes.vercel.app" // your deployed frontend
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true, // needed if sending cookies/auth headers
}));


app.use(express.json());
app.use("/auth", authRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected mongodb"))
  .catch((err) => console.error("Mongo Error: " + err));

app.get("/", (req, res) => {
  res.send("Backend running with MonogDB connected");
});

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
