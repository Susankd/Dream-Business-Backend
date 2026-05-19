const express = require('express');
const { chatLeadController } = require('../controllers');

const router = express.Router();

router.post('/message', chatLeadController.sendMessage);
router.get('/leads', chatLeadController.getAllLeads);
router.get('/conversations', chatLeadController.getAllConversations);
router.get('/leads/:leadId', chatLeadController.getLeadById);
router.get('/leads/:leadId/history', chatLeadController.getLeadHistory);
router.patch('/leads/:leadId/status', chatLeadController.updateLeadStatus);

module.exports = router;
