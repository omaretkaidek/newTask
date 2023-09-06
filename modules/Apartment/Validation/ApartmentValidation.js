// apartmentValidation.js

const { body, param } = require('express-validator');
const ApartmentModel = require('../model/ApartmentModel');

const id = param('id')
    .custom(async (value, { req }) => {
        if (!Number.isInteger(Number(value))) {
            // If the value isn't an integer, throw an error
            throw new Error('ID must be an integer');
        }
        // Check if the ID already exists in the database using ApartmentModel's idExists method
        const exists = await ApartmentModel.idApartmentExists(value);
        if (!exists) {
            throw new Error('Apartment ID does not exist in the database');
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
        // Check if the name already exists in the database using ApartmentModel's nameExists method
        const exists = await ApartmentModel.nameExists(value);
        if (exists) {
            throw new Error('Apartment Name already exists');
        }

        // Indicate a successful validation
        return true;
    });

const number_of_bedrooms = body('number_of_bedrooms')
    .isNumeric().withMessage('Number of bedrooms must be a number')
    .custom(value => {
        if (value <= 0) {
            throw new Error('Number of bedrooms must be a positive number');
        }
        return true; // validation succeeded
    })
    .optional(); // Makes this field optional

const rent_amount = body('rent_amount')
    .isNumeric().withMessage('Rent amount must be a number')
    .custom(value => {
        if (value <= 0) {
            throw new Error('Rent amount must be a positive number');
        }
        return true; // validation succeeded
    })
    .optional(); // Makes this field optional


const ApartmentValidation = [
    name,
    number_of_bedrooms,
    rent_amount
]

const idApartmentValidation = [
    id
]

module.exports = {
    ApartmentValidation,
    idApartmentValidation,
};