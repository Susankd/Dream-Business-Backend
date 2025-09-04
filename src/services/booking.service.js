const { emailService } = require('.');
const { Booking } = require('../models');

const createBooking = async (bookingBody) => {
  const booking = await Booking.create(bookingBody);

  try {
    // Split ADMIN_EMAIL into an array
    const adminEmails = process.env.ADMIN_EMAIL
      ? process.env.ADMIN_EMAIL.split(',').map((email) => email.trim())
      : [];

    if (adminEmails.length === 0) {
      console.log(
        'No admin emails configured in ENV. Skipping notification email.'
      );
      return booking;
    }

    // Format booking details for email body
    const emailBody = `
      <h2>New Consultation Booking Request</h2>
      <p>A new booking has been submitted. Please find the details below:</p>
      <hr>
      <h3>Contact Information</h3>
      <ul>
        <li><strong>Name:</strong> ${booking.name}</li>
        <li><strong>Email:</strong> ${booking.email}</li>
        <li><strong>Phone:</strong> ${booking.phone}</li>
        <li><strong>Payment:</strong> ${booking.paymentMethod}</li>
      </ul>
      <h3>Booking Details</h3>
      <ul>
        <li><strong>Consultation Type:</strong> ${booking.consultationType}</li>
        <li><strong>Date:</strong> ${booking.bookingDate}</li>
        <li><strong>Time:</strong> ${booking.bookingTime}</li>
      </ul>
      <h3>Questionnaire Answers</h3>
    `;

    // Convert questionnaireAnswers JSON into HTML
    let questionnaireHtml = '<ul>';
    for (const [key, value] of Object.entries(booking.questionnaireAnswers)) {
      const answer = Array.isArray(value) ? value.join(', ') : value;
      questionnaireHtml += `<li><strong>${key}:</strong> ${
        answer || 'Not provided'
      }</li>`;
    }
    questionnaireHtml += '</ul>';

    // Send email to admins (loop through)
    for (const to of adminEmails) {
      await emailService.sendBookingNotificationEmail(
        to,
        `New Booking Request from ${booking.name}`,
        emailBody + questionnaireHtml
      );
    }
  } catch (err) {
    console.error('Error sending booking notification email:', err);
  }

  return booking;
};

/**
 * Get paginated booking details
 * @param {Object} filter
 * @param {Object} options
 * @param {boolean} noRegex
 * @param {string|string[]} select
 */
const getAllBookingDetail = async (filter, options, noRegex, select) => {
  const bookings = await Booking.paginate(
    filter,
    options,
    noRegex,
    select,
    'getBooking'
  );
  return bookings;
};

/**
 * Get booking by ID
 * @param {string} id
 */
const getBookingById = async (id) => Booking.findById(id);

module.exports = {
  createBooking,
  getAllBookingDetail,
  getBookingById,
};
