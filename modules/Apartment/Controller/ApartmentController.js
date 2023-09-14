// apartmentController.js

const ApartmentService = require('../Service/ApartmentService');
const { validationResult } = require('express-validator');
const fileService = require('/Users/omaretkaidek/Desktop/newTask/modules/FileManager/Service/FileService');

exports.createApartment = async (req, res, next) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Validation failed", errors: errors.array() });
        }

        // Call the service method to handle the business logic
        const newApartment = await ApartmentService.registerApartment(req.body);
        if (req.files) {
            await Promise.all(req.files.map(async (file) => {
            const fileId = await fileService.uploadFile(file, "apartments", newApartment);
            }));
        }
        console.log("apartment created successfully");

        // Send back the appropriate response
        return res.status(201).json(newApartment);
    } catch (error) {
        // Handle errors (e.g., database issues, unexpected errors, etc.)
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

exports.getApartmentById = async (req, res) => {
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Validation failed", errors: errors.array() });
        }
    try {
        const apartmentId = req.params.id;
        const apartment = await ApartmentService.getApartmentById(apartmentId);

        if (!apartment) {
            return res.status(404).json({ message: "apartment not found" });
        }

        return res.status(200).json(apartment);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

exports.updateApartmentById = async (req, res, next) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Validation failed", errors: errors.array() });
        }

        const apartmentId = req.params.id;
        const updatedData = req.body;

        const updatedApartment = await ApartmentService.updateApartmentById(apartmentId, updatedData);

        if (!updatedApartment || updatedApartment.length === 0) {
            return res.status(404).json({ message: "Apartment not found" });
        }

        return res.status(200).json(updatedApartment);

    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};


exports.deleteApartmentById = async (req, res, next) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Validation failed", errors: errors.array() });
        }
        const apartmentId = req.params.id;

        const result = await ApartmentService.deleteApartmentById(apartmentId);

        if (result === 0) { // Assuming the service returns 0 if no rows were deleted
            return res.status(404).json({ message: "apartment not found" });
        }

        return res.status(204).send(); // 204 No Content for successful delete
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};



