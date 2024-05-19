const express = require('express')
const router = express.Router()
const userController = require('../Controller/UserController')

router.post('/signup',userController.signup)
router.post('/signin',userController.signin)
router.post('/askquestions',userController.askQuestions)
router.get('/getdetails/:user_Id',userController.showDetails)
router.get('/getdetails/:user_Id',userController.showDetails)


module.exports = router