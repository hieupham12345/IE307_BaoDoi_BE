const user = require('../models/user')
const bcrypt = require('bcryptjs')
const { generalAccessToken, generalRefreshToken } = require('./jwtService')


const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { username, password, email } = newUser

        try {
            const checkUser = await user.findOne({
                username: username
            })

            if (checkUser !== null) {
                resolve({
                    status: 'ERR',
                    message: 'The user is already'
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

const getDetailUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUserID = await user.findOne({
                _id: userId
            })
            console.log(checkUserID)
            if (checkUserID === null) {
                resolve ({
                    status: 'ERR',
                    message: 'The user is not defined'
                })
            }
            resolve({
                status: 'OK ',
                message: 'Success',
                data: checkUserID
            })
        }
        catch(e) {
            reject(e)
        }
    })
} 

const updateUser = async (userId, updateData) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUserID = await user.findOne({
                _id: userId
            })
            if (checkUserID === null) {
                resolve ({
                    status: 'ERR',
                    message: 'The user is not defined'
                })
            }
            const updatedUser = await user.findByIdAndUpdate(
                userId,
                updateData,
                { new: true }
            );
            resolve({
                status: 'OK ',
                message: 'Success',
                data: updatedUser
            })
        }
        catch(e) {
            reject(e)
        }
    })
} 

module.exports = { 
    createUser,
    loginUser,
    getDetailUser,
    updateUser
}