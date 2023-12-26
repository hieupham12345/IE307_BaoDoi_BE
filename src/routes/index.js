const articleRouter = require('./articleRouter')
const userRouter = require('./userRouter')
const routes = (app) => {
    app.use('/api/article', articleRouter)
    app.use('/api/user', userRouter)
}

module.exports = routes