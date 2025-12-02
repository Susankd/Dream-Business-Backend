const express = require('express');
const { khaltiController } = require('../controllers');

const router = express.Router();

router.post('/initiate', khaltiController.initiatePayment);
router.post('/lookup', khaltiController.verifyPayment);

module.exports = router;
