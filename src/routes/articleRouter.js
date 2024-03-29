const express = require('express')
const router = express.Router()
const articleController = require('../controllers/articleController')

router.post('/create', articleController.createArticle)
router.get('/getByCategory/:category', articleController.getByCategory)
router.get('/getById/:id', articleController.getById)

module.exports = router