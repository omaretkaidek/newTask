// permissionsValidation.js

const { body, param } = require('express-validator');
const PermissionsModel = require('../model/PermissionsModel');

const id = param('id')
    .custom(async (value, { req }) => {
        if (!Number.isInteger(Number(value))) {
            // If the value isn't an integer, throw an error
            throw new Error('ID must be an integer');
        }
        // Check if the ID already exists in the database using PermissionsModel's idExists method
        const exists = await PermissionsModel.idExists(value);
        if (!exists) {
            throw new Error('permission ID does not exist in the database');
        }

        // Indicate a successful validation
        return true;
    });

    const name = body('name').isString().withMessage('Name must be a string')
    .optional() // Makes this field optional
    .not().isEmpty().withMessage('Name is required')
    .isString().withMessage('Name must contain only letters')
    .isLength({ min: 3, max: 30 }).withMessage('Invalid name length')
    .custom(async (value, { req }) => {
        // Check if the name already exists in the database using PermissionsModel's nameExists method
        const exists = await PermissionsModel.nameExists(value);
        if (exists) {
            throw new Error('permission Name already exists');
        }

        // Indicate a successful validation
        return true;
    });

const description = body('description').isString().withMessage('Description must be a string')
    .optional() // Makes this field optional
    .not().isEmpty().withMessage('description is required')



const authenticationValidation = [] // Empty for Permissions


const createPermissionValidation = [
    name,
    description
]

const updatePermissionValidation = [
    name,
    description
]

const idPermissionValidation = [
    id
]

module.exports = {
    createPermissionValidation,
    updatePermissionValidation,
    idPermissionValidation,
    authenticationValidation
};