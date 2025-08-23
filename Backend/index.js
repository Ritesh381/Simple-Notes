const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const authRoutes = require("./routes/auth");
const cors = require("cors");

app = express();
app.use(cors({
  origin: "http://localhost:5173", // your React dev server
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true, // if you plan to send cookies
}))

app.use(express.json());
app.use("/auth", authRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected mongodb"))
  .catch((err) => console.error("Mongo Error: " + err));

app.get("/", (req, res) => {
  res.send("Backend running with MonogDB connected");
});

app.listen(8080, () => console.log("server running at https://localhost:8080"));
