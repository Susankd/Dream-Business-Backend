/* eslint-disable camelcase */
const httpStatus = require('http-status');
const { Payment } = require('../models');
const ApiError = require('../utils/ApiError');
const helper = require('../utils/helper');

const loadWalletFromKhalti = async (query) => {
  const { pidx, amount, transaction_id, name, email, phone, service } = query;
  try {
    const paymentInfo = await helper.verifyKhaltiPayment(pidx);

    if (
      paymentInfo.status !== 'Completed' ||
      paymentInfo.transaction_id !== transaction_id ||
      Number(paymentInfo.total_amount) !== Number(amount)
    ) {
      throw new ApiError(httpStatus[400], 'Incomplete information');
    }

    const remark = `Paid Rs. ${amount} for ${service} by ${name} (${phone} - ${email} )`;

    await Payment.create({
      transactionId: transaction_id,
      amount: parseFloat(amount / 100),
      status: paymentInfo ? paymentInfo.status : null,
      name,
      email,
      phone,
      service,
      remark,
    });

    return {
      success: true,
      message: 'Booking done successfully',
    };
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

module.exports = {
  loadWalletFromKhalti,
};
