const articleService = require('../services/articleService');

const createArticle = async (req, res) => {
  try {
    const { title, category, content, author } = req.body;
    const savedArticle = await articleService.createArticle(title, category, content, author);
    res.status(201).json(savedArticle);
  } catch (error) {
    console.error('Error creating article:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createArticle,
};
