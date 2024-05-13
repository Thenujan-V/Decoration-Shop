const express = require('express')
const router = express.Router()

const cardController = require('../Controller/CardController')

router.post('/addtocard',cardController.addToCard)
router.put('/updatequantity/:service_id',cardController.updateQuantity)
router.put('/showcard/:user_Id',cardController.showCard)

module.exports = router