const Joi = require('joi');
const { password } = require('./custom.validation');

const register = {
  body: Joi.object().keys({
    email: Joi.string().optional().email(),
    password: Joi.string().optional().allow(''),
    userName: Joi.string().required(),
    firstName: Joi.string().required(),
    middleName: Joi.string().optional().allow(''),
    lastName: Joi.string().required(),
    fullName: Joi.string().optional().allow(''),
    createdBy: Joi.string().optional().allow(''),
    updatedBy: Joi.string().optional().allow(''),
    profileImagePath: Joi.object().keys({
      imageUrl: Joi.string().optional().allow(''),
      publicKey: Joi.string().optional().allow('')
    }),
    contact: Joi.string().required(),
    address: Joi.string().required(),
    gender: Joi.string().required(),
    role: Joi.string().required(),
    isEmailVerified: Joi.string().optional().allow(''),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().optional().allow(''),
    userName: Joi.string().optional().allow(''),
    password: Joi.string().required(),
  }),
};

const logout = {
  body: Joi.object().keys({
    token: Joi.string().required(),
  }),
};

const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};

const changePassword = {
  body: Joi.object().keys({
    oldPassword: Joi.string().required().custom(password),
    newPassword: Joi.string().required().custom(password)
  }),
};

const resetPassword = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({
    password: Joi.string().required().custom(password),
  }),
};

const verifyEmail = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
  /** Password must be minimum of eight characters, with at least */
  /** one uppercase letter, one lowercase letter, one number and one special character */
  body: Joi.object().keys({
    password: Joi.string().required().custom(password)
  })
};

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  verifyEmail,
  changePassword
};
