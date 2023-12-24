const article = require('../models/article')

const createArticle = (title, category, content, author) => {
    return new Promise (async (resolve, reject) => {
        try {
            const createdArticle = await article.create({
                title,
                category,
                content,
                author
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

module.exports = {
    createArticle,
}