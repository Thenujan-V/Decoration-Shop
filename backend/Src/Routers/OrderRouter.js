const express = require('express')
const router = express.Router()
const { verifyToken, checkRole } = require('../Middlewares/authMiddleware');

const orderController = require('../Controller/OrderController')

router.post('/placeorder', verifyToken, checkRole('user'), orderController.placeOrder)
router.get('/vieworders/:user_Id', verifyToken, checkRole(['user', 'admin']), orderController.viewOrders)
router.get('/viewallorders', verifyToken, checkRole(['user', 'admin']), orderController.viewAllOrders)
router.get('/getleastorder/:user_Id', verifyToken, checkRole(['user', 'admin']), orderController.getLeastOrder)
router.get('/getorderdetails/:order_id', verifyToken, checkRole(['user', 'admin', 'employee']), orderController.viewOrdersDetails)
router.put('/updatepaymentstatus/:order_id', verifyToken, checkRole(['user']), orderController.updatePaymentStatus)



module.exports = router