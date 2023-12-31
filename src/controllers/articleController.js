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
    const { category } = req.params;
    const { limit } = req.query;
    console.log(limit, category)    
    const articles = await articleService.getByCategory(category, limit);
    res.status(200).json(articles);
  } catch (error) {
    console.error('Error getting articles by category:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getById = async (req, res) => {
  try {
    const ArticleId  = req.params.id; // Assuming category is in the URL params

    const article = await articleService.getById(ArticleId);
    res.status(200).json(article);
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createArticle,
  getByCategory,
  getById
};
