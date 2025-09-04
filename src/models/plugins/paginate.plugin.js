const paginate = (schema) => {
  /**
   * Validate the search query params
   * @param searchString
   * @returns {any}
   */

  const validateSearch = (searchString) => searchString;
  /**
   * Convert plain search object to regex object to implement text search in mongo
   * @param searchObject
   */
  const convertSearchToRegex = (searchObject, noCheckRegex = []) => {
    const regexObject = {};
    // eslint-disable-next-line guard-for-in,no-restricted-syntax
    for (const key of Object.keys(searchObject)) {
      // eslint-disable-next-line security/detect-non-literal-regexp
      if (noCheckRegex.includes(key)) {
        regexObject[key] = searchObject[key];
      } else {
        regexObject[key] = new RegExp(searchObject[key], 'i');
      }
    }
    return regexObject;
  };

  /**
   * @typedef {Object} QueryResult
   * @property {Document[]} results - Results found
   * @property {number} page - Current page
   * @property {number} limit - Maximum number of results per page
   * @property {number} totalPages - Total number of pages
   * @property {number} totalResults - Total number of documents
   */
  /**
   * Query for documents with pagination
   * @param {Object} [filter] - Mongo filter
   * @param {Object} [options] - Query options
   * @param {string} [options.sortBy] - Sorting criteria using the format: sortField:(desc|asc). Multiple sorting criteria should be separated by commas (,)
   * @param {string} [options.populate] - Populate data fields. Hierarchy of fields should be separated by (.). Multiple populating criteria should be separated by commas (,)
   * @param {number} [options.limit] - Maximum number of results per page (default = 10)
   * @param {number} [options.page] - Current page (default = 1)
   * @returns {Promise<QueryResult>}
   */
  schema.statics.paginate = async function (filter, options, noRegex) {
    let sort = '';
    if (options.sortBy) {
      const sortingCriteria = [];
      options.sortBy.split(',').forEach((sortOption) => {
        const [key, order] = sortOption.split(':');
        sortingCriteria.push((order === 'desc' ? '-' : '') + key);
      });
      sort = sortingCriteria.join(' ');
    } else {
      sort = 'createdAt';
    }

    const limit =
      options.limit && parseInt(options.limit, 10) > 0
        ? parseInt(options.limit, 10)
        : 10;
    const page =
      options.page && parseInt(options.page, 10) > 0
        ? parseInt(options.page, 10)
        : 1;
    const skip = (page - 1) * limit;

    noRegex = noRegex ? noRegex.split(',') : [];

    const searchFilter = convertSearchToRegex(validateSearch(filter), noRegex);

    const countPromise = this.countDocuments(searchFilter).exec();

    let docsPromise = this.find(searchFilter)
      .sort(sort)
      .skip(skip)
      .limit(limit);

    if (options.populate) {
      options.populate.split(',').forEach((populateOption) => {
        docsPromise = docsPromise.populate(
          populateOption
            .split('.')
            .reverse()
            .reduce((a, b) => ({ path: b, populate: a }))
        );
      });
    }

    docsPromise = docsPromise.exec();

    return Promise.all([countPromise, docsPromise]).then((values) => {
      const [totalResults, results] = values;
      const totalPages = Math.ceil(totalResults / limit);
      const result = {
        results,
        page,
        limit,
        totalPages,
        totalResults,
      };
      return Promise.resolve(result);
    });
  };
};

module.exports = paginate;
