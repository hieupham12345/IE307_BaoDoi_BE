const articleRouter = require('./articleRouter')

const routes = (app) => {
    app.use('/api/article', articleRouter)
}

module.exports = routes