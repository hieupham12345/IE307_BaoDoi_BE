const articleService = require('../services/articleService');

const createArticle = async (req, res) => {
  try {
    const { title, category, content, author, imgUrl } = req.body;
    const savedArticle = await articleService.createArticle(title, category, content, author, imgUrl);
    res.status(201).json(savedArticle);
  } catch (error) {
    console.error('Error creating article:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getByCategory = async (req, res) => {
  try {
    const { category } = req.params; // Assuming category is in the URL params
    const articles = await articleService.getByCategory(category);
    res.status(200).json(articles);
  } catch (error) {
    console.error('Error getting articles by category:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createArticle,
  getByCategory
};
