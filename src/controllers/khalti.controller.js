const axios = require('axios');
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');

const KHALTI_SECRET_KEY = '8e436ffa3fa14faa8100213ec2f9f6d6'; // Test Secret Key (Sandbox)

const initiatePayment = catchAsync(async (req, res) => {
  const payload = req.body;

  try {
    const response = await axios.post(
      'https://dev.khalti.com/api/v2/epayment/initiate/',
      payload,
      {
        headers: {
          Authorization: `Key ${KHALTI_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.status(httpStatus.OK).send(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).send(error.response.data);
    } else {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        message: 'Failed to initiate payment',
        error: error.message,
      });
    }
  }
});

const verifyPayment = catchAsync(async (req, res) => {
  const { pidx } = req.body;

  if (!pidx) {
    return res.status(httpStatus.BAD_REQUEST).send({ message: 'pidx is required' });
  }

  try {
    const response = await axios.post(
      'https://dev.khalti.com/api/v2/epayment/lookup/',
      { pidx },
      {
        headers: {
          Authorization: `Key ${KHALTI_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.status(httpStatus.OK).send(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).send(error.response.data);
    } else {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        message: 'Failed to verify payment',
        error: error.message,
      });
    }
  }
});


module.exports = {
  initiatePayment,
  verifyPayment,
};
