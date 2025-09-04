const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const {
  authService, userService, tokenService, emailService
} = require('../services');
const helper = require('../utils/helper');

const register = catchAsync(async (req, res) => {
  const data = req.body;
  const fullName = req.body.middleName !== '' ? data.firstName.concat(' ') + data.middleName.concat(' ')
    + data.lastName : data.firstName.concat(' ') + data.lastName;
  const createdBy = req.user.id;
  const userDetail = {
    ...req.body,
    fullName,
    createdBy
  };
  const user = await userService.createUser(userDetail);
  const tokens = await tokenService.generateAuthTokens(user);
  const verificationToken = tokens.access.token;

  await emailService.sendVerificationEmail(user.email, verificationToken, helper.getHostUrl());

  res.status(httpStatus.CREATED).send({
    code: 201,
    message: 'User created successfully'
  });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.token);
  res.status(httpStatus.NO_CONTENT).send({
    code: 201,
    message: 'User logout successfully'
  });
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken, helper.getHostUrl());
  res.status(httpStatus.NO_CONTENT).send(
    {
      code: 201,
      message: 'Token send in mail successfully'
    }
  );
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.query.token, req.body.password);
  res.status(httpStatus.NO_CONTENT).send({
    code: 201,
    message: 'Password reset successfully'
  });
});

const sendVerificationEmail = catchAsync(async (req, res) => {
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.user);
  await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const verifyEmail = catchAsync(async (req, res) => {
  const { password } = req.body;
  await authService.verifyEmail(req.query.token, password);
  res.status(httpStatus.NO_CONTENT).send({
    code: 201,
    message: 'Email verified successfully'
  });
});

/**
 * handles changePassword
 * @param {Object} req the http request
 * @param {Object} res the http response
 */
const changePassword = catchAsync(async (req, res) => {
  await authService.changePassword(req.user.id, req.body);
  res.status(httpStatus.CREATED).send({
    code: 201,
    message: 'Password updated successfully'
  });
});

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
  changePassword
};
