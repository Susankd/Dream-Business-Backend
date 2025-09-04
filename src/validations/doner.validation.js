const Joi = require('joi');

const createDonerDetail = {
  body: Joi.object().keys({
    firstName: Joi.string().required(),
    middleName: Joi.string().optional().allow(''),
    lastName: Joi.string().required(),
    age: Joi.string().required(),
    mobile: Joi.string().required(),
    province: Joi.string().required(),
    district: Joi.string().required(),
    city: Joi.string().required(),
    ward: Joi.string().required(),
    bloodGroup: Joi.string().required(),
    status: Joi.string().optional().allow(''),
    fullName: Joi.string().optional().allow(''),
    tole: Joi.string().optional().allow(''),
    email: Joi.string().optional().allow(''),
    createdAt: Joi.string().optional().allow(''),
    updatedAt: Joi.string().optional().allow(''),
    createdBy: Joi.string().optional().allow(''),
    updatedBy: Joi.string().optional().allow(''),
  }),
};

module.exports = { createDonerDetail };
