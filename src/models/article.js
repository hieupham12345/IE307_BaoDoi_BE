const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    hashtags: [{ type: String }], 
    imgUrls: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
