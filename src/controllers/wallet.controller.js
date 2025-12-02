const catchAsync = require('../utils/catchAsync');
const { walletService } = require('../services');

const verifyTransaction = catchAsync(async (req, res) => {
  res.json(await walletService.loadWalletFromKhalti(req.query));
});

module.exports = {
  verifyTransaction,
};
