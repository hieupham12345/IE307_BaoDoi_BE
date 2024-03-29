const userService = require('../services/userService')

const createUser = async (req,res) => {
    try {
        const { username, password, re_password, email } = req.body
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

        const isCheckEmail = reg.test(email)
        if (!username || !password || !re_password) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        } else if (email !== "" && !isCheckEmail){
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is email'
            })
        } else if (password !== re_password) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The password is equal to confirm password'
            })
        }
        const response = await userService.createUser(req.body)
        return res.status(200).json(response)
    }
    catch (e) {
        return res.status(404).json({
            message: e.message
        })
    }
}

const loginUser = async (req,res) => {
    try {
        const { username, password  } = req.body

        if (!username) {
            return res.status(200).json({
                status: 'ERROR',
                message: 'The input is required'
            })
        }else if (!password) {
            return res.status(200).json({
                status: 'ERROR',
                message: 'The input is required'
            })}

        const response = await userService.loginUser(req.body)
        // const { refresh_token, ...newResponse } = response
        // res.cookie('refresh_token', refresh_token, {
        //     HttpOnly: true,
        //     Secure: false,
        //     samesite: 'strict',
        //     path: '/',
        // })
        return res.status(200).json(response)
    }
    catch (e) {
        return res.status(404).json({
            message: e.message 
        })
    }
}

const getDetailUser = async (req,res) => {
    try {
        const userID = req.params.id
        if (!userID) {
            return res.status(200).json({
                status: 'ERR',
                message: 'UserId is required'
            })
        }
        const response = await userService.getDetailUser(userID)
        return res.status(200).json(response)
    }
    catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id; 
        const updateData = req.body; 

        const updatedUser = await userService.updateUser(userId, updateData);

        return res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    createUser,
    loginUser,
    getDetailUser,
    updateUser
}