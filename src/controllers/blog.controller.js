const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { blogService } = require('../services');
const ApiError = require('../utils/ApiError');
const pick = require('../utils/pick');

/**
 * Create a new blog
 */
const createBlog = catchAsync(async (req, res) => {
  const blogDetail = {
    ...req.body,
    coverImage: req.file ? `/uploads/${req.file.filename}` : undefined,
  };

  const blog = await blogService.createBlog(blogDetail);

  res.status(httpStatus.CREATED).send({
    code: 201,
    message: 'Blog added successfully',
    data: blog,
  });
});

/**
 * Get paginated blog details
 */
const getAllBlogDetail = catchAsync(async (req, res) => {
  const filter = pick(req.query, [
    'title',
    'slug',
    'category',
    'author',
    'featured',
    'homepage',
  ]);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const noRegex = pick(req.query, ['noRegex']);
  const select = pick(req.query, ['select']);

  const result = await blogService.getAllBlogDetail(
    filter,
    options,
    noRegex.noRegex,
    select.select
  );

  res.send(result);
});

/**
 * Get blog by ID
 */
const getBlogById = catchAsync(async (req, res) => {
  const blog = await blogService.getBlogById(req.params.blogId);
  if (!blog) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Blog not found');
  }
  res.send(blog);
});

/**
 * Update blog by ID
 */
const updateBlog = catchAsync(async (req, res) => {
  const updateBody = { ...req.body };

  if (req.file) {
    // new uploaded file
    updateBody.coverImage = `/uploads/${req.file.filename}`;
  } else if (req.body.coverImage) {
    // front-end sent a URL
    updateBody.coverImage = req.body.coverImage;
  }

  const blog = await blogService.updateBlogById(req.params.blogId, updateBody);

  res.send({
    code: 200,
    message: 'Blog updated successfully',
    data: blog,
  });
});

module.exports = {
  createBlog,
  getAllBlogDetail,
  getBlogById,
  updateBlog,
};
