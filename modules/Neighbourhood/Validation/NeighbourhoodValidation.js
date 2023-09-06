// neighbourhoodValidation.js

const { body, param } = require('express-validator');
const NeighbourhoodModel = require('../model/NeighbourhoodModel');

const id = param('id')
    .custom(async (value, { req }) => {
        if (!Number.isInteger(Number(value))) {
            // If the value isn't an integer, throw an error
            throw new Error('ID must be an integer');
        }
        // Check if the ID already exists in the database using NeighbourhoodModel's idExists method
        const exists = await NeighbourhoodModel.idNeighbourhoodExists(value);
        if (!exists) {
            throw new Error('Neighbourhood ID does not exist in the database');
        }

        // Indicate a successful validation
        return true;
    });

const name = body('name')
    .optional() // Makes this field optional
    .not().isEmpty().withMessage('Name is required')
    .isString().withMessage('Name must contain only letters')
    .isLength({ min: 3, max: 30 }).withMessage('Invalid name length')
    .custom(async (value, { req }) => {
        // Check if the name already exists in the database using NeighbourhoodModel's nameExists method
        const exists = await NeighbourhoodModel.nameExists(value);
        if (exists) {
            throw new Error('Neighbourhood Name already exists');
        }

        // Indicate a successful validation
        return true;
    });

const city = body('city').isString().withMessage('City must be a string')
    .optional() // Makes this field optional

const country = body('country').isString().withMessage('Country must be a string')
    .optional() // Makes this field optional

const NeighbourhoodValidation = [
    name,
    city,
    country
]

const idNeighbourhoodValidation = [
    id
]

module.exports = {
    NeighbourhoodValidation,
    idNeighbourhoodValidation,
};