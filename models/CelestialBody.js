const mongoose = require("mongoose");

const bodySchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { 
    type: String, 
    enum: ["Planet", "Moon", "Asteroid", "Comet", "Dwarf Planet", "Other"],
    required: true
  },
  description: { type: String, required: true },
  discoveryDate: { type: Date },
  discoveredBy: { type: String }
});

module.exports = mongoose.model("CelestialBody", bodySchema);
