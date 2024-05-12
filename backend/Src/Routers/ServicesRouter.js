const express = require('express')
const router = express.Router()

const servicesController = require('../Controller/ServicesController')

router.post('/addservice',servicesController.addServices)



module.exports = router