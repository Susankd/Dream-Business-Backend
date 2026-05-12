const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const contactSchema = mongoose.Schema(
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
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    phone: {
      type: String,
      trim: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    source: {
      type: String,
      trim: true,
      default: 'website',
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    status: {
      type: String,
      enum: ['unread', 'in_progress', 'replied', 'archived'],
      default: 'unread',
    },
    reply: {
      message: { type: String, trim: true },
      repliedAt: { type: Date },
      repliedBy: { type: String, trim: true },
    },
  },
  {
    timestamps: true,
  }
);

contactSchema.plugin(toJSON);
contactSchema.plugin(paginate);

/**
 * @typedef Contact
 */
const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
