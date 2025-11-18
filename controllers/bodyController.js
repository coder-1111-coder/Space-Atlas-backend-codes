const CelestialBody = require("../models/CelestialBody");

// Public: Get all
exports.getBodies = async (req, res) => {
  const filter = req.query.type ? { type: req.query.type } : {};
  const data = await CelestialBody.find(filter);
  res.json(data);
};

// Public: Get one
exports.getBody = async (req, res) => {
  const item = await CelestialBody.findById(req.params.id);
  if (!item) return res.status(404).json({ message: "Not found" });
  res.json(item);
};

// Admin: Create
exports.createBody = async (req, res) => {
  if (!req.body.name) return res.status(400).json({ message: "Name required" });

  const newBody = await CelestialBody.create(req.body);
  res.status(201).json(newBody);
};

// Admin: Update
exports.updateBody = async (req, res) => {
  const updated = await CelestialBody.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
};

// Admin: Delete
exports.deleteBody = async (req, res) => {
  await CelestialBody.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
