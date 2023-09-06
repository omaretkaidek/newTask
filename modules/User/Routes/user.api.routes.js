// user.api.routes.js

const express = require('express');
const router = express.Router();
const userController = require('../Controller/UserController');
const {updateUservalidation, idValidation, authenticationValidation, signInValidation } = require('../Validation/UserValidation');

// Map the HTTP verbs to controller methods
router.post('/register', authenticationValidation, userController.register);

router.post('/login', signInValidation, userController.login);
// GET request to retrieve a user by ID
router.get('/users/:id', idValidation, userController.getUserById);

// PUT request to update a user by ID
router.put('/users/:id', idValidation, updateUservalidation, userController.updateUserById);

// DELETE request to delete a user by ID
router.delete('/users/:id', idValidation, userController.deleteUserById);

module.exports = router;
