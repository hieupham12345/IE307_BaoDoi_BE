const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const { authUserMiddleware } = require("../middleware/authMiddleware")

router.post('/create', userController.createUser)
router.post('/sign-in', userController.loginUser)
router.get('/get-detail-user/:id',authUserMiddleware, userController.getDetailUser)

module.exports = router