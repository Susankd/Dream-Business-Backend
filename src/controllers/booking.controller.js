const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { bookingService } = require('../services');
const ApiError = require('../utils/ApiError');
const pick = require('../utils/pick');

/**
 * Create a new booking
 */
const createBooking = catchAsync(async (req, res) => {
  const bookingDetail = {
    ...req.body,
  };

  await bookingService.createBooking(bookingDetail.data);

  res.status(httpStatus.CREATED).send({
    code: 201,
    message: 'Booking added successfully',
  });
});

/**
 * Get paginated booking details
 */
const getAllBookingDetail = catchAsync(async (req, res) => {
  const filter = pick(req.query, [
    'name',
    'email',
    'phone',
    'consultationType',
    'bookingDate',
    'paymentMethod',
  ]);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const noRegex = pick(req.query, ['noRegex']);
  const select = pick(req.query, ['select']);

  const result = await bookingService.getAllBookingDetail(
    filter,
    options,
    noRegex.noRegex,
    select.select
  );
  res.send(result);
});

/**
 * Get booking by ID
 */
const getBookingById = catchAsync(async (req, res) => {
  const booking = await bookingService.getBookingById(req.params.bookingId);
  if (!booking) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Booking not found');
  }
  res.send(booking);
});

module.exports = {
  createBooking,
  getAllBookingDetail,
  getBookingById,
};
