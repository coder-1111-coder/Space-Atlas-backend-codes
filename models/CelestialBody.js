const mongoose = require("mongoose");

const CelestialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    unique: true,
    trim: true
  },
  type: {
    type: String,
    enum: {
      values: ["Planet", "Moon", "Asteroid", "Dwarf Planet", "Comet"],
      message: "{VALUE} is not a valid celestial body type"
    },
    required: [true, "Type is required"]
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    minlength: [50, "Description must be at least 50 characters (approximately 2 sentences)"],
    trim: true
  },
  imageUrl: {
    type: String,
    required: [true, "Image URL is required"],
    trim: true
  },
  discoveredBy: {
    type: String,
    required: [true, "Discoverer name is required"],
    trim: true
  },
  discoveryDate: {
    type: String,
    required: [true, "Discovery date is required"],
    trim: true
  },
  funFact: {
    type: String,
    required: [true, "Fun fact is required"],
    trim: true
  }
}, {
  versionKey: false,
  timestamps: false
});

// Text search index for name and description
CelestialSchema.index({ name: "text", description: "text" });

// Ensure name uniqueness
CelestialSchema.index({ name: 1 }, { unique: true });

module.exports = mongoose.model("CelestialBody", CelestialSchema);
