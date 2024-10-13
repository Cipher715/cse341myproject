const express = require('express');
const router = express.Router();

const userController = require('../controllers/contacts');
const validation = require('../middleware/validate');
const {isAuthenticated} = require('../middleware/authenticate');

router.get('/', userController.getAll);
router.get('/:id', userController.getSingle);
router.post('/', isAuthenticated, validation.saveContact, userController.createContact);
router.put('/:id', isAuthenticated, validation.saveContact, userController.updateContact);
router.delete('/:id', isAuthenticated, userController.deleteContact);

module.exports = router;