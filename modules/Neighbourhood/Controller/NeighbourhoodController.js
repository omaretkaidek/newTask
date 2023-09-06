// neighbourhoodController.js

const NeighbourhoodService = require('../Service/NeighbourhoodService');
const { validationResult } = require('express-validator');

exports.createNeighbourhood = async (req, res, next) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Validation failed", errors: errors.array() });
        }

        // Call the service method to handle the business logic
        const newNeighbourhood = await NeighbourhoodService.registerNeighbourhood(req.body);
        console.log("Neighbourhood created successfully");

        // Send back the appropriate response
        return res.status(201).json(newNeighbourhood);
    } catch (error) {
        // Handle errors (e.g., database issues, unexpected errors, etc.)
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

exports.getNeighbourhoodById = async (req, res, next) => {
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Validation failed", errors: errors.array() });
        }
    try {
        const neighbourhoodId = req.params.id;
        const neighbourhood = await NeighbourhoodService.getNeighbourhoodById(neighbourhoodId);

        if (!neighbourhood) {
            return res.status(404).json({ message: "Neighbourhood not found" });
        }

        return res.status(200).json(neighbourhood);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

exports.updateNeighbourhoodById = async (req, res, next) => {
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Validation failed", errors: errors.array() });
        }
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Validation failed", errors: errors.array() });
        }

        const neighbourhoodId = req.params.id;
        const updatedData = req.body;

        const updatedNeighbourhood = await NeighbourhoodService.updateNeighbourhoodById(neighbourhoodId, updatedData);

        if (!updatedNeighbourhood || updatedNeighbourhood.length === 0) {
            return res.status(404).json({ message: "Neighbourhood not found" });
        }

        return res.status(200).json(updatedNeighbourhood);

    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};


exports.deleteNeighbourhoodById = async (req, res, next) => {
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Validation failed", errors: errors.array() });
        }
    try {
        const neighbourhoodId = req.params.id;

        const result = await NeighbourhoodService.deleteNeighbourhoodById(neighbourhoodId);

        if (result === 0) { // Assuming the service returns 0 if no rows were deleted
            return res.status(404).json({ message: "Neighbourhood not found" });
        }

        return res.status(204).send(); // 204 No Content for successful delete
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

