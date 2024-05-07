const express = require('express')
const router = express.Router()

const employeeController = require('../Controller/EmployeeController')

router.post('/signup',employeeController.signup)
router.get('/showemployeedetails/:employee_id',employeeController.showEmployeeDetails)


module.exports = router