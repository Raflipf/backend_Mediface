require("dotenv").config();
const mongoose = require("mongoose");
const Doctor = require("../models/Doctor");

const doctors = [
  {
    name: "Ahmad Nugroho",
    specialty: "Kardiologi",
    status: "available",
    room: "101",
    phone: "08123456789",
    schedule: {
      monday: "08:00-16:00",
      tuesday: "08:00-16:00",
      wednesday: "08:00-16:00",
      thursday: "08:00-16:00",
      friday: "08:00-16:00",
      saturday: "08:00-12:00",
      sunday: "off",
    },
  },
  {
    name: "Siti Rahayu",
    specialty: "Pediatri",
    status: "available",
    room: "102",
    phone: "08123456790",
    schedule: {
      monday: "09:00-17:00",
      tuesday: "09:00-17:00",
      wednesday: "09:00-17:00",
      thursday: "09:00-17:00",
      friday: "09:00-17:00",
      saturday: "09:00-13:00",
      sunday: "off",
    },
  },
  {
    name: "Budi Santoso",
    specialty: "Orthopedi",
    status: "available",
    room: "103",
    phone: "08123456791",
    schedule: {
      monday: "08:00-16:00",
      tuesday: "08:00-16:00",
      wednesday: "08:00-16:00",
      thursday: "08:00-16:00",
      friday: "08:00-16:00",
      saturday: "08:00-12:00",
      sunday: "off",
    },
  },
  {
    name: "Maya Kusuma",
    specialty: "Dermatologi",
    status: "available",
    room: "104",
    phone: "08123456792",
    schedule: {
      monday: "10:00-18:00",
      tuesday: "10:00-18:00",
      wednesday: "10:00-18:00",
      thursday: "10:00-18:00",
      friday: "10:00-18:00",
      saturday: "10:00-14:00",
      sunday: "off",
    },
  },
  {
    name: "Rizki Pratama",
    specialty: "Neurologi",
    status: "available",
    room: "105",
    phone: "08123456793",
    schedule: {
      monday: "08:00-16:00",
      tuesday: "08:00-16:00",
      wednesday: "08:00-16:00",
      thursday: "08:00-16:00",
      friday: "08:00-16:00",
      saturday: "08:00-12:00",
      sunday: "off",
    },
  },
  {
    name: "Dewi Lestari",
    specialty: "Obstetri & Ginekologi",
    status: "available",
    room: "106",
    phone: "08123456794",
    schedule: {
      monday: "09:00-17:00",
      tuesday: "09:00-17:00",
      wednesday: "09:00-17:00",
      thursday: "09:00-17:00",
      friday: "09:00-17:00",
      saturday: "09:00-13:00",
      sunday: "off",
    },
  },
  {
    name: "Eko Wijaya",
    specialty: "Penyakit Dalam",
    status: "available",
    room: "107",
    phone: "08123456795",
    schedule: {
      monday: "08:00-16:00",
      tuesday: "08:00-16:00",
      wednesday: "08:00-16:00",
      thursday: "08:00-16:00",
      friday: "08:00-16:00",
      saturday: "08:00-12:00",
      sunday: "off",
    },
  },
  {
    name: "Indah Permata",
    specialty: "Mata",
    status: "available",
    room: "108",
    phone: "08123456796",
    schedule: {
      monday: "10:00-18:00",
      tuesday: "10:00-18:00",
      wednesday: "10:00-18:00",
      thursday: "10:00-18:00",
      friday: "10:00-18:00",
      saturday: "10:00-14:00",
      sunday: "off",
    },
  },
];

async function initializeDoctors() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");

    // Clear existing doctors
    await Doctor.deleteMany({});

    // Insert doctors
    await Doctor.insertMany(doctors);
    console.log("Doctors data initialized");

    await mongoose.disconnect();
  } catch (error) {
    console.error("Error initializing doctors:", error);
  }
}

initializeDoctors();
