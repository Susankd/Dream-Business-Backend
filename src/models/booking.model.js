const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const bookingSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          // basic email validation using regex
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    consultationType: {
      type: String,
      // enum: [
      //   'Business Growth Advisory for Startups',
      //   'Strategic Business Advisory',
      //   'Capital Raising & Investment Consulting',
      //   'Project Financing & Bank Loan Advisory',
      //   'Public Listing and IPO Readiness Consulting',
      //   'Corporate Tax, Legal & Foreign Investment Consulting',
      // ],
      required: true,
    },
    bookingDate: {
      type: Date,
      required: true,
    },
    bookingTime: {
      type: String, // storing time as string in 'HH:mm' format
      required: true,
    },
    questionnaireAnswers: {
      type: mongoose.Schema.Types.Mixed, // to store JSON object
      required: true,
    },
    paymentMethod: {
      type: String,
      // required: true,
      trim: true,
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed'],
      default: 'pending',
    },
    transactionId: {
      type: String,
      trim: true,
    },

  },
  {
    timestamps: true,
  }
);

// pre-save hook (optional, if needed)
bookingSchema.pre('save', async function (next) {
  next();
});

// add plugins
bookingSchema.plugin(toJSON);
bookingSchema.plugin(paginate);

/**
 * @typedef Booking
 */
const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
