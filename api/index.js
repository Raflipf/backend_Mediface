require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Middleware
app.use(express.json());

// MongoDB connection caching for serverless
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((mongoose) => {
        return mongoose;
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

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

module.exports = async (req, res) => {
  await connectToDatabase();
  return app(req, res);
};
