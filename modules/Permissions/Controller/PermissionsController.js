// permissionsController.js

const PermissionsService = require('../Service/PermissionsService');
const { validationResult } = require('express-validator');

exports.createPermission = async (req, res, next) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Validation failed", errors: errors.array() });
        }

        // Call the service method to handle the business logic
        const newPermission = await PermissionsService.registerPermissions(req.body);
        console.log("Permissions created successfully");

        // Send back the appropriate response
        return res.status(201).json(newPermission);
    } catch (error) {
        // Handle errors (e.g., database issues, unexpected errors, etc.)
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

exports.getPermissionById = async (req, res, next) => {
    try {
        const permissionId = req.params.id;
        const permissions = await PermissionsService.getPermissionById(permissionId);

        if (!permissions) {
            return res.status(404).json({ message: "Permissions not found" });
        }

        return res.status(200).json(permissions);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

exports.updatePermissionById = async (req, res, next) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Validation failed", errors: errors.array() });
        }

        const permissionId = req.params.id;
        const updatedData = req.body;

        const updatedPermissions = await PermissionsService.updatePermissionById(permissionId, updatedData);

        if (!updatedPermissions || updatedPermissions.length === 0) {
            return res.status(404).json({ message: "Permissions not found" });
        }

        return res.status(200).json(updatedPermissions);

    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};


exports.deletePermissionById = async (req, res, next) => {
    try {
        const permissionId = req.params.id;

        const result = await PermissionsService.deletePermissionById(permissionId);

        if (result === 0) { // Assuming the service returns 0 if no rows were deleted
            return res.status(404).json({ message: "Permissions not found" });
        }

        return res.status(204).send(); // 204 No Content for successful delete
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

