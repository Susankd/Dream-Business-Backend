const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const subscriptionSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    name: {
      type: String,
      trim: true,
    },
    source: {
      type: String,
      trim: true,
      default: 'footer-newsletter',
    },
    list: {
      // which list the subscriber opted into
      type: String,
      trim: true,
      default: 'weekly-business-tips',
    },
    status: {
      type: String,
      enum: ['active', 'unsubscribed', 'bounced'],
      default: 'active',
    },
    subscribedAt: {
      type: Date,
      default: Date.now,
    },
    unsubscribedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

subscriptionSchema.plugin(toJSON);
subscriptionSchema.plugin(paginate);

/**
 * @typedef Subscription
 */
const Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = Subscription;
