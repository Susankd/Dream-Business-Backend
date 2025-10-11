const express = require('express');
const { blogController } = require('../controllers');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Make sure this folder exists
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});
const upload = multer({ storage });

/**
 * Create a new blog or get all blogs
 */
router
  .route('/')
  .post(
    upload.single('coverImage'), // 'coverImage' matches FormData field
    blogController.createBlog
  )
  .get(blogController.getAllBlogDetail);

/**
 * Get, Update, Delete blog by ID
 */
router.route('/:blogId').get(blogController.getBlogById).patch(
  upload.single('coverImage'), // allows updating coverImage
  blogController.updateBlog
);

router.route('/slug/:slug').get(blogController.getBlogBySlug);
// Optional: add delete if needed
// .delete(blogController.deleteBlog);

module.exports = router;
