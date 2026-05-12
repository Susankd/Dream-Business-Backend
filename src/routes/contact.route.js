const express = require('express');
const { contactController } = require('../controllers');

const router = express.Router();

router
  .route('/')
  .post(contactController.createContact) // public: submit contact form
  .get(contactController.getContacts);   // admin: list

router
  .route('/:contactId')
  .get(contactController.getContact)
  .patch(contactController.updateContact)
  .delete(contactController.deleteContact);

router.post('/:contactId/reply', contactController.replyContact);

module.exports = router;
