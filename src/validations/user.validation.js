const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
    role: Joi.string().required().valid('user', 'admin'),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    fullName: Joi.string(),
    email: Joi.string().email(),
    contact: Joi.string(),
    address: Joi.string(),
    gender: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email().optional().allow(''),
      userName: Joi.string().optional().allow(''),
      firstName: Joi.string().required(),
      middleName: Joi.string().optional().allow(''),
      lastName: Joi.string().required(),
      profileImagePath: Joi.object().keys({
        imageUrl: Joi.string().optional().allow(''),
        publicKey: Joi.string().optional().allow(''),
      }),
      contact: Joi.string().required(),
      address: Joi.string().required(),
      gender: Joi.string().required(),
      role: Joi.string().required(),
      isEmailVerified: Joi.string().optional().allow(''),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
