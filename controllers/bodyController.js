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
    sort = "-createdAt"
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
    .limit(limitNum)
    .select("-__v");

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
 * @route   GET /api/bodies/:idOrSlug
 * @desc    Get single celestial body by ID or slug
 * @access  Public
 */
exports.getBody = asyncHandler(async (req, res) => {
  const { idOrSlug } = req.params;

  // Try to find by ID first, then by slug
  let body;

  if (idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
    // Valid ObjectId format
    body = await CelestialBody.findById(idOrSlug).select("-__v");
  }

  if (!body) {
    // Try finding by slug
    body = await CelestialBody.findOne({ slug: idOrSlug }).select("-__v");
  }

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
 * @route   GET /api/bodies/slug/:slug
 * @desc    Get single celestial body by slug only
 * @access  Public
 */
exports.getBodyBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  const body = await CelestialBody.findOne({ slug }).select("-__v");

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
  const newBody = await CelestialBody.create(req.body);

  res.status(201).json({
    success: true,
    message: "Celestial body created successfully",
    data: newBody
  });
});

/**
 * @route   PUT /api/bodies/:idOrSlug
 * @desc    Update celestial body by ID or slug
 * @access  Private/Admin
 */
exports.updateBody = asyncHandler(async (req, res) => {
  const { idOrSlug } = req.params;

  // Find by ID or slug
  let query;
  if (idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
    query = { _id: idOrSlug };
  } else {
    query = { slug: idOrSlug };
  }

  const updated = await CelestialBody.findOneAndUpdate(
    query,
    req.body,
    {
      new: true,
      runValidators: true,
      select: "-__v"
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
 * @route   DELETE /api/bodies/:idOrSlug
 * @desc    Delete celestial body by ID or slug
 * @access  Private/Admin
 */
exports.deleteBody = asyncHandler(async (req, res) => {
  const { idOrSlug } = req.params;

  // Find by ID or slug
  let query;
  if (idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
    query = { _id: idOrSlug };
  } else {
    query = { slug: idOrSlug };
  }

  const deleted = await CelestialBody.findOneAndDelete(query);

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
