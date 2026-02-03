const express = require('express');
const firmsewaController = require('../controllers/firmsewa.controller');
// const auth = require('../middlewares/auth'); // Add auth middleware if needed
// const validate = require('../middlewares/validate'); // Add validation if needed
// const firmsewaValidation = require('../validations/firmsewa.validation'); // Add validation schema

const router = express.Router();

router
    .route('/')
    .post(firmsewaController.createFirmsewa)
    .get(firmsewaController.getFirmsewas);

router
    .route('/:firmsewaId')
    .get(firmsewaController.getFirmsewa)
    .patch(firmsewaController.updateFirmsewa)
    .delete(firmsewaController.deleteFirmsewa);

module.exports = router;
