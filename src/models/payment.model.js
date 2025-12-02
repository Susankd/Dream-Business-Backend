const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { paymentStaus } = require('../utils/helper');

const paymentSchema = new mongoose.Schema(
  {
    transactionId: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    },

    phone: {
      type: String,
    },
    service: {
      type: String,
    },
    status: {
      type: String,
      enum: paymentStaus,
      default: `${paymentStaus.Pending}`,
    },
    remark: {
      type: String,
    },
  },
  { timestamps: true }
);

paymentSchema.plugin(toJSON);
paymentSchema.plugin(paginate);

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
