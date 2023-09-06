// apartment.api.routes.js

const express = require("express");
const router = express.Router();
const apartmentController = require("../Controller/ApartmentController");
const authorizeUser = require("/Users/omaretkaidek/Desktop/newTask/modules/Middlewares/authorization");
const {
  ApartmentValidation,
  idApartmentValidation,
} = require("../Validation/ApartmentValidation");

// Map the HTTP verbs to controller methods

// POST request to create a new user
router.post(
  "/apartments",
  authorizeUser("write_apartment"),
  ApartmentValidation,
  apartmentController.createApartment
);

// For the GET API to read an apartment
router.get(
  "/apartments/:id",
  authorizeUser("read_apartment"),
  idApartmentValidation,
  ApartmentValidation,
  apartmentController.getApartmentById
);

// PUT request to update a user by ID
router.put(
  "/apartments/:id",
  authorizeUser("update_apartment"),
  idApartmentValidation,
  ApartmentValidation,
  apartmentController.updateApartmentById
);

// DELETE request to delete a user by ID
router.delete(
  "/apartments/:id",
  authorizeUser("delete_apartment"),
  idApartmentValidation,
  apartmentController.deleteApartmentById
);

module.exports = router;
