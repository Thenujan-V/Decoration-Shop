const express = require('express')
const router = express.Router()

const adminController = require('../Controller/AdminController')

router.post('/signup',adminController.signup)
router.get('/showadmindetails/:admin_id',adminController.showAdminDetails)
router.get('/showAllEmployees',adminController.showAllEmployees)
router.get('/showEmployeeDetail/:user_Id',adminController.showEmployeeDetails)
router.get('/getusersdetails',adminController.showAllUsers)
router.get('/showUserDetail/:user_Id',adminController.showUserDetails)
router.post('/signupemp',adminController.empSignup)
router.post('/asignemp',adminController.asignEmp)


module.exports = router  