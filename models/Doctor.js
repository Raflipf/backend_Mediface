const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  status: { type: String },
  room: { type: String },
  phone: { type: String },
  schedule: { type: mongoose.Schema.Types.Mixed }, // JSON or separate schema if needed
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

doctorSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

module.exports = mongoose.model("Doctor", doctorSchema);
