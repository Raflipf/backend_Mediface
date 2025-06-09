const express = require("express");
const Doctor = require("../models/Doctor");
const { authenticateToken } = require("../middleware/auth");

const router = express.Router();

// Get all doctors
router.get("/", authenticateToken, async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan server", error });
  }
});

// Get doctor by ID
router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor)
      return res.status(404).json({ message: "Dokter tidak ditemukan" });
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan server", error });
  }
});

// Create new doctor
router.post("/", authenticateToken, async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.status(201).json(doctor);
  } catch (error) {
    res.status(400).json({ message: "Data dokter tidak valid", error });
  }
});

// Update doctor
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!doctor)
      return res.status(404).json({ message: "Dokter tidak ditemukan" });
    res.json(doctor);
  } catch (error) {
    res.status(400).json({ message: "Data dokter tidak valid", error });
  }
});

// Delete doctor
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor)
      return res.status(404).json({ message: "Dokter tidak ditemukan" });
    res.json({ message: "Dokter berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan server", error });
  }
});

module.exports = router;
