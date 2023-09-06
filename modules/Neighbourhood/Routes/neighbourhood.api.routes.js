// neighbourhood.api.routes.js

const express = require('express');
const router = express.Router();
const neighbourhoodController = require('../Controller/NeighbourhoodController');
const { NeighbourhoodValidation, idNeighbourhoodValidation } = require('../Validation/NeighbourhoodValidation');
const authorizeUser = require("/Users/omaretkaidek/Desktop/newTask/modules/Middlewares/authorization");
// Map the HTTP verbs to controller methods

router.post('/neighbourhoods', authorizeUser("write_neighbourhood"), NeighbourhoodValidation, neighbourhoodController.createNeighbourhood);

router.get('/neighbourhoods/:id', authorizeUser("read_neighbourhood"),idNeighbourhoodValidation, neighbourhoodController.getNeighbourhoodById);

router.put('/neighbourhoods/:id', authorizeUser("update_neighbourhood"),idNeighbourhoodValidation, NeighbourhoodValidation, neighbourhoodController.updateNeighbourhoodById);

router.delete('/neighbourhoods/:id', authorizeUser("delete_neighbourhood"),idNeighbourhoodValidation, neighbourhoodController.deleteNeighbourhoodById);


module.exports = router;
