require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Basic route
app.get("/", (req, res) => {
  res.json({ message: "API Mediface berjalan" });
});

const authRoutes = require("../routes/auth");
const patientRoutes = require("../routes/patient");
const doctorRoutes = require("../routes/doctor");
const queueRoutes = require("../routes/queue");
const userRoutes = require("../routes/user");

app.use("/api/auth", authRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/queues", queueRoutes);
app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});
