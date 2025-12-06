const CelestialBody = require("../models/CelestialBody");
const asyncHandler = require("../utils/asyncHandler");

/**
 * @route   GET /api/bodies
 * @desc    Get all celestial bodies with pagination, search, filters, and sorting
 * @access  Public
 */
exports.getBodies = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    search,
    type,
    sort = "name"
  } = req.query;

  // Build query
  const query = {};

  // Type filter
  if (type) {
    query.type = type;
  }

  // Text search
  if (search) {
    query.$text = { $search: search };
  }

  // Pagination
  const skip = (parseInt(page) - 1) * parseInt(limit);
  const limitNum = parseInt(limit);

  // Execute query with sorting
  const bodies = await CelestialBody.find(query)
    .sort(sort)
    .skip(skip)
    .limit(limitNum);

  // Get total count for pagination
  const total = await CelestialBody.countDocuments(query);

  res.json({
    success: true,
    data: bodies,
    pagination: {
      page: parseInt(page),
      limit: limitNum,
      total,
      pages: Math.ceil(total / limitNum)
    }
  });
});

/**
 * @route   GET /api/bodies/:id
 * @desc    Get single celestial body by ID only
 * @access  Public
 */
exports.getBody = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Find by ID only (slug removed)
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({
      success: false,
      message: "Invalid ID format"
    });
  }

  const body = await CelestialBody.findById(id);

  if (!body) {
    return res.status(404).json({
      success: false,
      message: "Celestial body not found"
    });
  }

  res.json({
    success: true,
    data: body
  });
});

/**
 * @route   POST /api/bodies
 * @desc    Create new celestial body
 * @access  Private/Admin
 */
exports.createBody = asyncHandler(async (req, res) => {
  // Validate all required fields
  const { name, type, description, imageUrl, discoveredBy, discoveryDate, funFact } = req.body;

  const missingFields = [];
  if (!name) missingFields.push("name");
  if (!type) missingFields.push("type");
  if (!description) missingFields.push("description");
  if (!imageUrl) missingFields.push("imageUrl");
  if (!discoveredBy) missingFields.push("discoveredBy");
  if (!discoveryDate) missingFields.push("discoveryDate");
  if (!funFact) missingFields.push("funFact");

  if (missingFields.length > 0) {
    return res.status(400).json({
      success: false,
      message: `Missing required fields: ${missingFields.join(", ")}`
    });
  }

  // Check if name already exists
  const existing = await CelestialBody.findOne({ name });
  if (existing) {
    return res.status(400).json({
      success: false,
      message: "A celestial body with this name already exists"
    });
  }

  const newBody = await CelestialBody.create(req.body);

  res.status(201).json({
    success: true,
    message: "Celestial body created successfully",
    data: newBody
  });
});

/**
 * @route   PUT /api/bodies/:id
 * @desc    Update celestial body by ID
 * @access  Private/Admin
 */
exports.updateBody = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({
      success: false,
      message: "Invalid ID format"
    });
  }

  // If updating name, check for duplicates
  if (req.body.name) {
    const existing = await CelestialBody.findOne({
      name: req.body.name,
      _id: { $ne: id }
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "A celestial body with this name already exists"
      });
    }
  }

  const updated = await CelestialBody.findByIdAndUpdate(
    id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  );

  if (!updated) {
    return res.status(404).json({
      success: false,
      message: "Celestial body not found"
    });
  }

  res.json({
    success: true,
    message: "Celestial body updated successfully",
    data: updated
  });
});

/**
 * @route   DELETE /api/bodies/:id
 * @desc    Delete celestial body by ID
 * @access  Private/Admin
 */
exports.deleteBody = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({
      success: false,
      message: "Invalid ID format"
    });
  }

  const deleted = await CelestialBody.findByIdAndDelete(id);

  if (!deleted) {
    return res.status(404).json({
      success: false,
      message: "Celestial body not found"
    });
  }

  res.json({
    success: true,
    message: "Celestial body deleted successfully"
  });
});
