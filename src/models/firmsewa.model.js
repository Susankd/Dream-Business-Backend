const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const firmsewaSchema = mongoose.Schema(
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
        },
        phoneNumber: {
            type: String,
            required: true,
            trim: true,
        },
        serviceRequired: {
            type: String,
            required: true,
            trim: true,
        },
        message: {
            type: String,
            trim: true,
        },
        status: {
            type: String,
            enum: ['pending', 'in_progress', 'replied', 'archived'],
            default: 'pending',
        },
    },
    {
        timestamps: true,
    }
);

// Plugins
firmsewaSchema.plugin(toJSON);
firmsewaSchema.plugin(paginate);

/**
 * @typedef Firmsewa
 */
const Firmsewa = mongoose.model('Firmsewa', firmsewaSchema);

module.exports = Firmsewa;
