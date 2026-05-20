const express = require('express');
const { emailClientController } = require('../controllers');

const router = express.Router();

router.get('/categories', emailClientController.getCategories);
router.get('/templates', emailClientController.getTemplates);
router.post('/send', emailClientController.sendCampaign);
router.get('/campaigns', emailClientController.getCampaigns);
router.get('/by-category/:category', emailClientController.getClientsByCategory);

router
  .route('/')
  .get(emailClientController.getAllClients)
  .post(emailClientController.createClient);

router
  .route('/:clientId')
  .get(emailClientController.getClientById)
  .patch(emailClientController.updateClient)
  .delete(emailClientController.deleteClient);

module.exports = router;
