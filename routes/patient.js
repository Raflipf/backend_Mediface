const express = require("express");
const Patient = require("../models/Patient");
const { authenticateToken } = require("../middleware/auth");

const router = express.Router();

// Get all patients
router.get("/", authenticateToken, async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan server", error });
  }
});

// Get patient by ID
router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient)
      return res.status(404).json({ message: "Pasien tidak ditemukan" });
    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan server", error });
  }
});

// Create new patient
router.post("/", authenticateToken, async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.status(201).json(patient);
  } catch (error) {
    res.status(400).json({ message: "Data pasien tidak valid", error });
  }
});

// Update patient
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!patient)
      return res.status(404).json({ message: "Pasien tidak ditemukan" });
    res.json(patient);
  } catch (error) {
    res.status(400).json({ message: "Data pasien tidak valid", error });
  }
});

// Delete patient
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient)
      return res.status(404).json({ message: "Pasien tidak ditemukan" });
    res.json({ message: "Pasien berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan server", error });
  }
});

module.exports = router;
