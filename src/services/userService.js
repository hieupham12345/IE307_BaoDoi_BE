const user = require('../models/user')
const bcrypt = require('bcryptjs')
const { generalAccessToken, generalRefreshToken } = require('./jwtService')


const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { username, password, email } = newUser

        try {
            const checkUser = await user.findOne({
                email: email
            })

            if (checkUser !== null) {
                resolve({
                    status: 'ERR',
                    message: 'The phone number is already'
                })
            } else {
                const hash = bcrypt.hashSync(password, 10)
                const createdUser = await user.create({
                    username,
                    password: hash,
                    email
                })

                if (createdUser) {
                    resolve({
                        status: 'OK',
                        message: 'SUCCESS',
                        data: createdUser
                    })
                }
            }
        } catch (e) {
            reject(e)
        }
    })
}

const loginUser = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const { username, password } = userLogin

        try {
            const checkUser = await user.findOne({
                username: username
            })
        
            if (checkUser === null) {
                resolve ({
                    status: 'ERROR',
                    message: 'The user is not defined'
                })
            }
            const comparePassword = bcrypt.compareSync(password, checkUser.password)

            if (!comparePassword) {
                resolve ({
                    status: 'ERROR',
                    message: 'The password or username is incorrect'
                })
            }

            const access_token = await generalAccessToken({
                id: checkUser.id,
            })

            const refresh_token = await generalRefreshToken({
                id: checkUser.id,
            })

            resolve ({
                status: 'OK',
                message: 'success',
                access_token,
                refresh_token
            })
        }
        catch(e) {
            reject(e)
        }
    })
} 

module.exports = { 
    createUser,
    loginUser    
}