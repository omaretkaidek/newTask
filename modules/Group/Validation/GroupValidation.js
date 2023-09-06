// groupValidation.js

const { body, param } = require('express-validator');
const GroupModel = require('../model/GroupModel');
const PermissionsModel = require('/Users/omaretkaidek/Desktop/newTask/modules/Permissions/model/PermissionsModel');

const id = param('id')
    .custom(async (value, { req }) => {
        if (!Number.isInteger(Number(value))) {
            // If the value isn't an integer, throw an error
            throw new Error('ID must be an integer');
        }
        // Check if the ID already exists in the database using GroupModel's idExists method
        const exists = await GroupModel.idExists(value);
        if (!exists) {
            throw new Error('Group ID does not exist in the database');
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
        // Check if the name already exists in the database using GroupModel's nameExists method
        const exists = await GroupModel.nameGroupExists(value);
        if (exists) {
            throw new Error('Group Name already exists');
        }

        // Indicate a successful validation
        return true;
    });

const description = body('description').isString().withMessage('Description must be a string')
    .optional() // Makes this field optional
    .not().isEmpty().withMessage('description is required')

const permissions = body('permissions')
    .isArray().withMessage('Permissions should be an array')
    .custom(async (permissions) => {
        if (permissions.length < 1) {
            throw new Error('At least one permission should be assigned');
        }
        for (let permission of permissions) {
            const exists = await PermissionsModel.idPermissionExists(permission);
            if (!exists) {
                throw new Error(`Permission with id ${permission} doesn't exist`);
            }
        }
        return true;
    });




const authenticationValidation = [] // Empty for Group


const createGroupValidation = [
    name,
    description,
    permissions
]

const updateGroupValidation = [
    name,
    description
]

const idGroupValidation = [
    id
]

module.exports = {
    createGroupValidation,
    updateGroupValidation,
    idGroupValidation,
    authenticationValidation
};