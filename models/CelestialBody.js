const mongoose = require("mongoose");
const slugify = require("slugify");

const bodySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    maxlength: [200, "Name cannot exceed 200 characters"]
  },
  slug: {
    type: String,
    unique: true,
    index: true
  },
  type: {
    type: String,
    enum: {
      values: ["Planet", "Moon", "Asteroid", "Comet", "Dwarf Planet", "Other"],
      message: "{VALUE} is not a valid celestial body type"
    },
    required: [true, "Type is required"]
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    trim: true,
    minlength: [10, "Description must be at least 10 characters"],
    maxlength: [2000, "Description cannot exceed 2000 characters"]
  },
  discoveryDate: {
    type: Date,
    default: null
  },
  discoveredBy: {
    type: String,
    trim: true,
    maxlength: [200, "Discoverer name cannot exceed 200 characters"]
  },
  imageUrl: {
    type: String,
    trim: true
  },
  scientificFacts: {
    radius_km: { type: String },
    mass_kg: { type: String },
    gravity_m_s2: { type: String },
    orbital_period_days: { type: String },
    temperature_range_c: { type: String },
    atmosphere: { type: String }
  }
}, {
  timestamps: true // Adds createdAt and updatedAt
});

// Text search index for name and description
bodySchema.index({ name: "text", description: "text" });

// Pre-save hook to generate slug
bodySchema.pre("save", async function (next) {
  if (this.isModified("name")) {
    let baseSlug = slugify(this.name, { lower: true, strict: true });
    let slug = baseSlug;
    let counter = 1;

    // Ensure unique slug
    while (await this.constructor.findOne({ slug, _id: { $ne: this._id } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    this.slug = slug;
  }
  next();
});

// Pre-update hook for findOneAndUpdate
bodySchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();

  if (update.name || update.$set?.name) {
    const newName = update.name || update.$set?.name;
    let baseSlug = slugify(newName, { lower: true, strict: true });
    let slug = baseSlug;
    let counter = 1;

    const docId = this.getQuery()._id;

    // Ensure unique slug
    while (await this.model.findOne({ slug, _id: { $ne: docId } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    if (update.$set) {
      update.$set.slug = slug;
    } else {
      this.setUpdate({ ...update, slug });
    }
  }
  next();
});

module.exports = mongoose.model("CelestialBody", bodySchema);
