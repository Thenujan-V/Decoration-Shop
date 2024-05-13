const express = require('express')
const router = express.Router()

const servicesController = require('../Controller/ServicesController')

router.post('/addservice',servicesController.addServices)
router.get('/viewservice',servicesController.viewServices)
router.get('/viewservicedetails/:service_id',servicesController.viewServiceDetails)



module.exports = router