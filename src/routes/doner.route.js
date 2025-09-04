const express = require('express');
const { donerController } = require('../controllers');
const { donerValidation } = require('../validations');
const validate = require('../middlewares/validate');

const router = express.Router();

router.route('/provinces').get(donerController.getAllProvince);
router
  .route('/district/:provincesId')
  .get(donerController.getAllDistrictByProvince);

router
  .route('/')
  .post(
    validate(donerValidation.createDonerDetail),
    donerController.createDoner
  )
  .get(donerController.getAllDonerDetail);

router.route('/:donerId').get(donerController.getDonerById);

module.exports = router;
