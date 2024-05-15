const express = require('express')
const router = express.Router()

const paymentController = require('../Controller/PaymentController')

router.post('/addpaymentmethod',paymentController.addPaymentMethod)
router.put('/addpayment',paymentController.addPayment)



module.exports = router