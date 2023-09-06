// permissions.api.routes.js

const express = require('express');
const router = express.Router();
const permissionsController = require('../Controller/PermissionsController');
const { createPermissionValidation, updatePermissionValidation, idPermissionValidation, authenticationValidation } = require('../Validation/PermissionsValidation');

// Map the HTTP verbs to controller methods

// POST request to create a new user
router.post('/permissions', createPermissionValidation, permissionsController.createPermission);

// GET request to retrieve a user by ID
router.get('/permissions/:id', idPermissionValidation, permissionsController.getPermissionById);

// PUT request to update a user by ID
router.put('/permissions/:id', idPermissionValidation, updatePermissionValidation, permissionsController.updatePermissionById);

// DELETE request to delete a user by ID
router.delete('/permissions/:id', idPermissionValidation, permissionsController.deletePermissionById);




module.exports = router;
