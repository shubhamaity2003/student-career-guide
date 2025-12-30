require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");

const app = express();

/* Middleware */
app.use(cors());
app.use(express.json());

/* Test root route */
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

/* Routes */
app.use("/api/auth", authRoutes);

/* MongoDB */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas connected"))
  .catch(err => console.error("MongoDB error:", err));

/* Server */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
