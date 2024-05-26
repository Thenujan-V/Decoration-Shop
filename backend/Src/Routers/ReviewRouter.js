const express = require('express')
const router = express.Router()
const { verifyToken, checkRole } = require('../Middlewares/authMiddleware');

const reviewController = require('../Controller/ReviewController')

router.post('/addreview', verifyToken, checkRole(['user']), reviewController.addReview)
router.get('/getreview', verifyToken, checkRole(['admin']), reviewController.getReview)





module.exports = router