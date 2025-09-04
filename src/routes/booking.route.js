const express = require('express');
const { bookingController } = require('../controllers');
const validate = require('../middlewares/validate');

const router = express.Router();

/**
 * Create a new booking or get all bookings
 */
router
  .route('/')
  .post(
    // validate(bookingValidation.createBookingDetail),
    bookingController.createBooking
  )
  .get(bookingController.getAllBookingDetail);

/**
 * Get booking by ID
 */
router.route('/:bookingId').get(bookingController.getBookingById);

module.exports = router;
