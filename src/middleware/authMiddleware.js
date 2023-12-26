const jwt = require('jsonwebtoken')
require('dotenv').config()

const authUserMiddleware = (req, res, next) => {
    const token = req.headers.token.split(' ')[1]
    const userId = req.params.id
    jwt.verify(token, process.env.ACCESS_TOKEN, function(err, user) {
        if (err){
            return res.status(404).json({
                message: 'The authentication',
                status: 'ERR',
            })
        }

        if (user.isAdmin || user.id === userId) {
            next()
        } else {
            return res.status(404).json({
                message: 'The authentication',
                status: 'ERR'
            })
        }

    }); 
}

module.exports = {
    authUserMiddleware
}