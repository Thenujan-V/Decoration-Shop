const express = require('express')
const router = express.Router()

const reviewController = require('../Controller/ReviewController')

router.post('/addreview', reviewController.addReview)
router.get('/getreview', reviewController.getReview)





module.exports = router