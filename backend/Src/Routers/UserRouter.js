const express = require('express')
const router = express.Router()
const userController = require('../Controller/UserController')

router.post('/signup',userController.signup)
router.post('/signin',userController.signin)
router.get('/getdetails/:user_Id',userController.showDetails)
router.get('/getusersdetails',userController.showAllUsers)


module.exports = router