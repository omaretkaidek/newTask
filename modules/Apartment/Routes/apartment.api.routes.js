// apartment.api.routes.js

const express = require("express");
const router = express.Router();
const apartmentController = require("../Controller/ApartmentController");
const authorizeUser = require("../../Middlewares/authorization");
const {
  ApartmentValidation,
  idApartmentValidation,
} = require("../Validation/ApartmentValidation");

const upload = require('/Users/omaretkaidek/Desktop/newTask/modules/Middlewares/FileUploadMiddleware');


// Map the HTTP verbs to controller methods

// POST request to create a new user
router.post(
  "/apartments",
  authorizeUser("write_apartment"),
  upload.array('apartmentPhotos', 10), // for example, up to 10 photos
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
