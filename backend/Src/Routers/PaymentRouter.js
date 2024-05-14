const express = require('express')
const router = express.Router()

const paymentController = require('../Controller/PaymentController')

router.post('/addpayment',paymentController.addPayment)



module.exports = router