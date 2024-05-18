const express = require('express')
const router = express.Router()

const employeeController = require('../Controller/EmployeeController')

router.get('/showemployeedetails/:employee_id',employeeController.showEmployeeDetails)
router.put('/taskacceptance/:employee_id/:order_id',employeeController.taskAcceptance)
router.put('/statusupdate/:employee_id/:order_id',employeeController.statusUpdate)
router.get('/getorderdetails/:employee_id',employeeController.getOrderDetails)


module.exports = router