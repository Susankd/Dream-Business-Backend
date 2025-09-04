const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { donerService } = require('../services');
const ApiError = require('../utils/ApiError');
const pick = require('../utils/pick');

const getAllProvince = catchAsync(async (req, res) => {
  res.send(await donerService.getAllProvince());
});

const getAllDistrictByProvince = catchAsync(async (req, res) => {
  const { provincesId } = req.params;
  res.send(await donerService.getAllDistrictByProvince(provincesId));
});

const createDoner = catchAsync(async (req, res) => {
  const donerDetail = {
    ...req.body,
  };

  await donerService.createDoner(donerDetail);

  res.status(httpStatus.CREATED).send({
    code: 201,
    message: 'Doner added successfully',
  });
});

const getAllDonerDetail = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['province', 'district', 'city', 'ward', 'bloodGroup']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const noRegex = pick(req.query, ['noRegex']);
  const select = pick(req.query, ['select']);
  const result = await donerService.getAllDonerDetail(
    filter,
    options,
    noRegex.noRegex,
    select.select
  );
  res.send(result);
});

const getDonerById = catchAsync(async (req, res) => {
  const doner = await donerService.getDonerById(req.params.donerId);
  if (!doner) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Doner detail not found');
  }
  res.send(doner);
});

module.exports = {
  getAllDistrictByProvince,
  getAllProvince,
  createDoner,
  getAllDonerDetail,
  getDonerById,
};
