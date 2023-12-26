const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.post('/create', userController.createUser)
router.post('/sign-in', userController.loginUser)

module.exports = router