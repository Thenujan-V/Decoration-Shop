const express = require('express')
const router = express.Router()
const { verifyToken, checkRole } = require('../Middlewares/authMiddleware');

const paymentController = require('../Controller/PaymentController')

router.post('/addpaymentmethod', verifyToken, checkRole(['user']), paymentController.addPaymentMethod)
router.put('/addpayment', verifyToken, checkRole(['user', 'admin']), paymentController.addPayment)
router.get('/paymentdetails/:order_id', verifyToken, checkRole(['user', 'admin']), paymentController.paymentDetails)



module.exports = router