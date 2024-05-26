const express = require('express')
const router = express.Router()
const { verifyToken, checkRole } = require('../Middlewares/authMiddleware');

const servicesController = require('../Controller/ServicesController')

router.post('/addservice', verifyToken, checkRole(['admin']), servicesController.addServices)
router.get('/viewservice', servicesController.viewServices)
router.get('/viewservicedetails/:service_id', servicesController.viewServiceDetails)



module.exports = router