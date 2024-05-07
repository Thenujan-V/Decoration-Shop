const express = require('express')
const router = express.Router()

const adminController = require('../Controller/AdminController')

router.post('/signup',adminController.signup)
router.get('/showadmindetails/:admin_id',adminController.showAdminDetails)
router.get('/showAllEmployees',adminController.showAllEmployees)
router.get('/getusersdetails',adminController.showAllUsers)


module.exports = router