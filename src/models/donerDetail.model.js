const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const donerDetailSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    middleName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    fullName: {
      type: String,
      trim: true,
    },
    age: {
      type: String,
      trim: true,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
      trim: true,
    },
    province: {
      type: String,
      required: true,
      trim: true,
    },
    district: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    ward: {
      type: String,
      required: true,
      trim: true,
    },
    tole: {
      type: String,
      required: true,
      trim: true,
    },
    bloodGroup: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    status: {
      type: String,
      default: 'active',
      trim: true,
    },
    createdBy: {
      type: String,
    },
    updatedBy: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

donerDetailSchema.pre('save', async function (next) {
  this.firstName = this.firstName.trim()[0].toUpperCase()
    + this.firstName.slice(1).toLowerCase();
  this.middleName = typeof this.middleName !== 'undefined' && this.middleName !== ''
    ? this.middleName.trim()[0].toUpperCase()
        + this.middleName.slice(1).toLowerCase()
    : '';
  this.lastName = this.lastName.trim()[0].toUpperCase()
    + this.lastName.slice(1).toLowerCase();

  this.fullName = this.middleName !== ''
    ? this.firstName.concat(' ') + this.middleName.concat(' ') + this.lastName
    : this.firstName.concat(' ') + this.lastName;

  next();
});

// add plugin that converts mongoose to json
donerDetailSchema.plugin(toJSON);
donerDetailSchema.plugin(paginate);

/**
 * @typedef Doner
 */
const Doner = mongoose.model('Doner', donerDetailSchema);

module.exports = Doner;
