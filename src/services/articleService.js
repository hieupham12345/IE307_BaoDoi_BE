const article = require('../models/article')

const createArticle = (title, category, content, author, imgUrl) => {
    return new Promise (async (resolve, reject) => {
        try {
            const createdArticle = await article.create({
                title,
                category,
                content,
                author,
                imgUrl
            })
            if (createdArticle) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createArticle
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

const getByCategory = (category) => {
  return new Promise(async (resolve, reject) => {
    try {
      const articles = await article.find({ category });
      resolve({
        status: 'OK',
        message: 'SUCCESS',
        data: articles
      });
    } catch (e) {
      reject(e);
    }
  });
};


module.exports = {
    createArticle,
    getByCategory
}