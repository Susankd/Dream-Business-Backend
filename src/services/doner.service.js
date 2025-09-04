const nepalGeojson = require('nepal-geojson');
const { Doner } = require('../models');

const getAllProvince = async () => {
  const provincesGeojson = nepalGeojson.listProvincesWithDistricts();
  const provinces = provincesGeojson.map((res) => res.details);
  return provinces;
};

const getAllDistrictByProvince = async (provinceId) => {
  const provinceIdNum = parseInt(provinceId, 10);
  const districtsGeojson = nepalGeojson.listProvinceWithDistricts(provinceIdNum);
  return districtsGeojson.districts;
};

const createDoner = async (userBody) => Doner.create(userBody);

const getAllDonerDetail = async (filter, options, noRegex, select) => {
  const doner = await Doner.paginate(
    filter,
    options,
    noRegex,
    select,
    'getDoner'
  );
  return doner;
};

const getDonerById = async (id) => Doner.findById(id);

module.exports = {
  getAllProvince,
  getAllDistrictByProvince,
  getAllDonerDetail,
  createDoner,
  getDonerById
};
