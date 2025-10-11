const { Blog } = require('../models');

/**
 * Create a new blog
 * @param {Object} blogBody
 * @returns {Promise<Blog>}
 */
const createBlog = async (blogBody) => {
  const getBlog = await Blog.findOne({ slug: blogBody?.slug });

  if (getBlog) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Blog slug already taken');
  }

  const blog = await Blog.create(blogBody);
  return blog;
};

/**
 * Get paginated blog list
 * @param {Object} filter
 * @param {Object} options
 * @param {boolean} noRegex
 * @param {string|string[]} select
 * @returns {Promise<QueryResult>}
 */
const getAllBlogDetail = async (filter, options, noRegex, select) => {
  const blogs = await Blog.paginate(
    filter,
    options,
    noRegex,
    select,
    'getBlog'
  );
  return blogs;
};

/**
 * Get blog by ID
 * @param {string} id
 * @returns {Promise<Blog>}
 */
const getBlogById = async (id) => Blog.findById(id);

/**
 * Update a blog by ID
 * @param {string} blogId
 * @param {Object} updateBody
 * @returns {Promise<Blog>}
 */
const updateBlogById = async (blogId, updateBody) => {
  const blog = await Blog.findById(blogId);
  if (!blog) {
    throw new Error('Blog not found');
  }

  Object.assign(blog, updateBody);
  await blog.save();
  return blog;
};

/**
 * Get blog by ID
 * @param {string} id
 * @returns {Promise<Blog>}
 */
const getBlogBySlug = async (slug) => {
  const blog = await Blog.findOne({ slug });

  return blog;
};

module.exports = {
  createBlog,
  getAllBlogDetail,
  getBlogById,
  updateBlogById,
  getBlogBySlug,
};
