/**
 * Validation Middleware for Celestial Body
 */
module.exports = function validateBody(req, res, next) {
    const { name, type, description, imageUrl } = req.body;

    if (!name || !type || !description) {
        return res.status(400).json({
            success: false,
            message: "Missing required fields: name, type, and description are required"
        });
    }

    // Auto-generate slug from name
    req.body.slug = name
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');

    next();
};
