// groupController.js

const GroupService = require('../Service/GroupService');
const { validationResult } = require('express-validator');

exports.createGroup = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const groupData = {
            name: req.body.name,
            description: req.body.description
        };
        const permissions = req.body.permissions;

        const groupId = await GroupService.createGroup(groupData, permissions);
        return res.status(201).json({ id: groupId });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


exports.getGroupById = async (req, res, next) => {
    try {
        const groupId = req.params.id;
        const group = await GroupService.getGroupById(groupId);

        if (!group) {
            return res.status(404).json({ message: "Group not found" });
        }

        return res.status(200).json(group);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

exports.updateGroupById = async (req, res, next) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Validation failed", errors: errors.array() });
        }

        const groupId = req.params.id;
        const updatedData = req.body;

        const updatedGroup = await GroupService.updateGroupById(groupId, updatedData);

        if (!updatedGroup || updatedGroup.length === 0) {
            return res.status(404).json({ message: "Group not found" });
        }

        return res.status(200).json(updatedGroup);

    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};


exports.deleteGroupById = async (req, res, next) => {
    try {
        const groupId = req.params.id;

        const result = await GroupService.deleteGroupById(groupId);

        if (result === 0) { // Assuming the service returns 0 if no rows were deleted
            return res.status(404).json({ message: "Group not found" });
        }

        return res.status(204).send(); // 204 No Content for successful delete
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

