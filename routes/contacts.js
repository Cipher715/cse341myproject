const express = require('express');
const router = express.Router();

const userController = require('../controllers/contacts');
const validation = require('../middleware/validate');

router.get('/', userController.getAll);
router.get('/:id', userController.getSingle);

router.post('/', validation.saveContact, userController.createContact);

router.put('/:id', validation.saveContact, userController.updateContact);

router.delete('/:id', userController.deleteContact);

module.exports = router;