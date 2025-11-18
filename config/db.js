const mongoose = require("mongoose");
const CelestialBody = require("../models/CelestialBody");

const defaultData = [
  {
    name: "Mercury",
    type: "Planet",
    description: "The smallest planet and closest to the Sun.",
    discoveryDate: "0-01-01",
    discoveredBy: "Known since ancient times"
  },
  {
    name: "Venus",
    type: "Planet",
    description: "Second planet from the Sun with a thick toxic atmosphere.",
    discoveryDate: "0-01-01",
    discoveredBy: "Known since ancient times"
  },
  {
    name: "Earth",
    type: "Planet",
    description: "Our home planet with life, oceans, and atmosphere.",
    discoveryDate: "0-01-01",
    discoveredBy: "N/A"
  },
  {
    name: "Moon",
    type: "Moon",
    description: "Earth's only natural satellite.",
    discoveryDate: "0-01-01",
    discoveredBy: "N/A"
  },
  {
    name: "Europa",
    type: "Moon",
    description: "Jupiter's icy moon believed to have a subsurface ocean.",
    discoveryDate: "1610-01-07",
    discoveredBy: "Galileo Galilei"
  },
  {
    name: "Halley's Comet",
    type: "Comet",
    description: "A short-period comet visible from Earth every 76 years.",
    discoveryDate: "1758-12-25",
    discoveredBy: "Edmond Halley"
  }
];

const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB Connected Successfully");

    // Auto-Insert Sample Data if Collection is Empty
    const count = await CelestialBody.countDocuments();

    if (count === 0) {
      console.log("Inserting default celestial bodies...");
      await CelestialBody.insertMany(defaultData);
      console.log("Sample celestial bodies added successfully ✔");
    } else {
      console.log("Celestial bodies already exist ✔");
    }

  } catch (err) {
    console.log("MongoDB Error:", err.message);
    throw err;
  }
};

module.exports = connectDB;
