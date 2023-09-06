// group.api.routes.js

const express = require('express');
const router = express.Router();
const groupController = require('../Controller/GroupController');
const { createGroupValidation, updateGroupValidation, idGroupValidation } = require('../Validation/GroupValidation');



// Map the HTTP verbs to controller methods

router.post('/groups', createGroupValidation, groupController.createGroup);

router.get('/groups/:id', idGroupValidation, groupController.getGroupById);

router.put('/groups/:id', idGroupValidation, updateGroupValidation, groupController.updateGroupById);

router.delete('/groups/:id', idGroupValidation, groupController.deleteGroupById);




module.exports = router;

