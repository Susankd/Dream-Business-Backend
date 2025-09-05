const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String, // storing HTML or rich text
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    category: {
      type: String,
      required: false,
    },
    readTime: {
      type: String, // e.g. "5 min"
    },
    author: {
      type: String,
      trim: true,
    },
    coverImage: {
      type: String, // store file URL / path (S3, Cloudinary, etc.)
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    SEO: {
      title: { type: String, trim: true },
      description: { type: String, trim: true },
      keywords: [{ type: String, trim: true }],
      metaImage: { type: String }, // optional SEO image
    },
    homepage: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook: auto-generate slug if missing
blogSchema.pre('save', function (next) {
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-') // replace spaces & special chars with "-"
      .replace(/(^-|-$)+/g, ''); // trim dashes
  }
  next();
});

// Plugins
blogSchema.plugin(toJSON);
blogSchema.plugin(paginate);

/**
 * @typedef Blog
 */
const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
