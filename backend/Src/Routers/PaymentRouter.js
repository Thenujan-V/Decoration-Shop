const express = require('express')
const router = express.Router()

const paymentController = require('../Controller/PaymentController')

router.post('/addpaymentmethod',paymentController.addPaymentMethod)



module.exports = router