const express = require('express')
const router = express.Router()
const { verifyToken, checkRole } = require('../Middlewares/authMiddleware');

const employeeController = require('../Controller/EmployeeController')

router.get('/showemployeedetails/:employee_id', verifyToken, checkRole(['employee']), employeeController.showEmployeeDetails)
router.put('/taskacceptance/:employee_id/:order_id', verifyToken, checkRole(['employee']), employeeController.taskAcceptance)
router.put('/statusupdate/:employee_id/:order_id', verifyToken, checkRole(['employee']), employeeController.statusUpdate)
router.get('/getorderdetails/:employee_id', verifyToken, checkRole(['employee', 'admin']), employeeController.getOrderDetails)
router.get('/showorderdetails/:order_id', verifyToken, checkRole(['employee', 'admin']), employeeController.showOrderDetails)
router.get('/allowancedetails/:employee_id/:order_id', verifyToken, checkRole(['employee', 'admin']), employeeController.allowanceDetails)
router.get('/allallowancedetails/:employee_id', verifyToken, checkRole(['employee', 'admin']), employeeController.allallowancesDetails)
router.put('/updateallowancestatus/:allowance_id', verifyToken, checkRole(['employee', 'admin']), employeeController.allowanceStatusUpdate)


module.exports = router