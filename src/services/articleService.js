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

const getByCategory = async (category, limit) => {
  try {
    let query = article.find({ category });

    if (limit) {
      query = query.limit(parseInt(limit, 10)); // Parse limit to an integer
    }

    const articles = await query.exec();

    return {
      status: 'OK',
      message: 'SUCCESS',
      data: articles,
    };
  } catch (error) {
    throw error;
  }
};

const getById = (AId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkArticle = await article.findOne({
                _id: AId
            })

            if (checkArticle === null) {
                resolve ({
                    status: 'ERR',
                    message: 'The article is not defined'
                })
            }
            resolve({
                status: 'OK ',
                message: 'Success',
                data: checkArticle
            })
        }
        catch(e) {
            reject(e)
        }
    })
} 

module.exports = {
    createArticle,
    getByCategory,
    getById
}