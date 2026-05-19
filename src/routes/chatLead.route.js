const express = require('express');
const { chatLeadController } = require('../controllers');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/message', chatLeadController.sendMessage);
router.get('/leads', auth(), chatLeadController.getAllLeads);
router.get('/leads/:leadId', auth(), chatLeadController.getLeadById);
router.get('/leads/:leadId/history', auth(), chatLeadController.getLeadHistory);
router.patch('/leads/:leadId/status', auth(), chatLeadController.updateLeadStatus);

module.exports = router;
