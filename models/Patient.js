const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  nik: { type: String, unique: true, required: true },
  birthDate: { type: Date, required: true },
  gender: { type: String, enum: ["male", "female", "other"], required: true },
  bloodType: { type: String },
  phone: { type: String },
  email: { type: String },
  address: { type: String },
  emergencyContact: { type: String },
  photos: [{ type: String }], // array of photo URLs or paths
  embeddings: [{ type: Number }], // array of numbers for embeddings
  registrationDate: { type: Date, default: Date.now },
  status: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

patientSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

module.exports = mongoose.model("Patient", patientSchema);
