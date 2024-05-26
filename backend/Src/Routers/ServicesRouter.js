const express = require('express')
const router = express.Router()
const { verifyToken, checkRole } = require('../Middlewares/authMiddleware');

const servicesController = require('../Controller/ServicesController')

router.post('/addservice', verifyToken, checkRole(['admin']), servicesController.addServices)
router.get('/viewservice', verifyToken, checkRole(['user', 'admin']), servicesController.viewServices)
router.get('/viewservicedetails/:service_id', verifyToken, checkRole(['user', 'admin']), servicesController.viewServiceDetails)



module.exports = router