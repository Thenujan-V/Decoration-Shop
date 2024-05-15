const express = require('express')
const router = express.Router()

const orderController = require('../Controller/OrderController')

router.post('/placeorder',orderController.placeOrder)
router.get('/vieworders/:user_Id',orderController.viewOrders)
router.get('/getleastorder/:user_Id',orderController.getLeastOrder)



module.exports = router