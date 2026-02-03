const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { firmsewaService } = require('../services');

const createFirmsewa = catchAsync(async (req, res) => {
    const firmsewa = await firmsewaService.createFirmsewa(req.body);
    res.status(httpStatus.CREATED).send(firmsewa);
});

const getFirmsewas = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['name', 'status', 'serviceRequired']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    if (!options.sortBy) {
        options.sortBy = 'createdAt:desc';
    }
    const result = await firmsewaService.queryFirmsewas(filter, options);
    res.send(result);
});

const getFirmsewa = catchAsync(async (req, res) => {
    const firmsewa = await firmsewaService.getFirmsewaById(req.params.firmsewaId);
    if (!firmsewa) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Firmsewa submission not found');
    }
    res.send(firmsewa);
});

const updateFirmsewa = catchAsync(async (req, res) => {
    const firmsewa = await firmsewaService.updateFirmsewaById(req.params.firmsewaId, req.body);
    res.send(firmsewa);
});

const deleteFirmsewa = catchAsync(async (req, res) => {
    await firmsewaService.deleteFirmsewaById(req.params.firmsewaId);
    res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
    createFirmsewa,
    getFirmsewas,
    getFirmsewa,
    updateFirmsewa,
    deleteFirmsewa,
};
