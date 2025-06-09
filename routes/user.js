const express = require("express");
const User = require("../models/User");
const { authenticateToken } = require("../middleware/auth");

const router = express.Router();

// Middleware to check admin role
function authorizeAdmin(req, res, next) {
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Akses ditolak, hanya admin yang dapat mengakses" });
  }
  next();
}

// Get all users (admin only)
router.get("/", authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const users = await User.find().select("-password_hash");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan server", error });
  }
});

module.exports = router;
