// userValidation.js

const { body, param } = require('express-validator');
const UserModel = require('../model/UserModel');

const id = param('id')
    .custom(async (value, { req }) => {
        if (!Number.isInteger(Number(value))) {
            // If the value isn't an integer, throw an error
            throw new Error('ID must be an integer');
        }
        // Check if the ID already exists in the database using UserModel's idExists method
        const exists = await UserModel.idExists(value);
        if (!exists) {
            // If a user with the provided ID is found, throw an error
            throw new Error('ID does not exist in the database');
        }

        // Indicate a successful validation
        return true;
    });

const name = body('Username')
    .not().isEmpty().withMessage('username is required')
    .isString().withMessage('username must contain only letters')
    .isLength({ min: 3, max: 30 }).withMessage('Invalid username length')
    .custom(async (value, { req }) => {
        // Check if the name already exists in the database using UserModel's nameExists method
        const exists = await UserModel.nameExists(value);
        if (exists) {
            throw new Error('username already exists');
        }
        // Indicate a successful validation
        return true;
    });

const email = body('Email')
    .not().isEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email address');

const password = body('Password')
    .not().isEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long');

const authenticationValidation = [
    name,
    email,
    password
]

const  signInValidation = [
    email,
    password
]

const updateUservalidation = [
    name,
    email,
    password

]

const idValidation = [
    id
]

module.exports = {
    updateUservalidation,
    signInValidation,
    idValidation,
    authenticationValidation
};