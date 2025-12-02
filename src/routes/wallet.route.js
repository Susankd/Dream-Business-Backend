const express = require('express');
const { walletController } = require('../controllers');

const router = express.Router();

router.route('/verify-khalti-payment').get(walletController.verifyTransaction);

module.exports = router;
