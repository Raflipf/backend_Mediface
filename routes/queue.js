const express = require("express");
const Queue = require("../models/Queue");
const { authenticateToken } = require("../middleware/auth");

const router = express.Router();

// Get all queues
router.get("/", authenticateToken, async (req, res) => {
  try {
    const queues = await Queue.find()
      .populate("patient_id")
      .populate("doctor_id");
    res.json(queues);
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan server", error });
  }
});

// Get queue by ID
router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const queue = await Queue.findById(req.params.id)
      .populate("patient_id")
      .populate("doctor_id");
    if (!queue)
      return res.status(404).json({ message: "Antrian tidak ditemukan" });
    res.json(queue);
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan server", error });
  }
});

// Create new queue
router.post("/", authenticateToken, async (req, res) => {
  try {
    const queue = new Queue(req.body);
    await queue.save();
    res.status(201).json(queue);
  } catch (error) {
    res.status(400).json({ message: "Data antrian tidak valid", error });
  }
});

// Update queue
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const queue = await Queue.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!queue)
      return res.status(404).json({ message: "Antrian tidak ditemukan" });
    res.json(queue);
  } catch (error) {
    res.status(400).json({ message: "Data antrian tidak valid", error });
  }
});

// Delete queue
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const queue = await Queue.findByIdAndDelete(req.params.id);
    if (!queue)
      return res.status(404).json({ message: "Antrian tidak ditemukan" });
    res.json({ message: "Antrian berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan server", error });
  }
});

module.exports = router;
