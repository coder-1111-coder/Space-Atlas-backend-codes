/**
 * Validation Middleware for Celestial Body
 * Validates all required fields according to new schema
 */
module.exports = function validateBody(req, res, next) {
    const { name, type, description, imageUrl, discoveredBy, discoveryDate, funFact } = req.body;

    const errors = [];

    // Check required fields
    if (!name || name.trim() === "") errors.push("name is required");
    if (!type) errors.push("type is required");
    if (!description || description.trim() === "") errors.push("description is required");
    if (!imageUrl || imageUrl.trim() === "") errors.push("imageUrl is required");
    if (!discoveredBy || discoveredBy.trim() === "") errors.push("discoveredBy is required");
    if (!discoveryDate || discoveryDate.trim() === "") errors.push("discoveryDate is required");
    if (!funFact || funFact.trim() === "") errors.push("funFact is required");

    // Validate type enum
    const validTypes = ["Planet", "Moon", "Asteroid", "Dwarf Planet", "Comet"];
    if (type && !validTypes.includes(type)) {
        errors.push(`type must be one of: ${validTypes.join(", ")}`);
    }

    // Validate description length (minimum 50 characters for ~2 sentences)
    if (description && description.trim().length < 50) {
        errors.push("description must be at least 50 characters (approximately 2 sentences)");
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: errors
        });
    }

    next();
};
