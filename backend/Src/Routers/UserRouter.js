const express = require('express')
const router = express.Router()
const userController = require('../Controller/UserController')
const { verifyToken, checkRole } = require('../Middlewares/authMiddleware');


router.post('/signup',userController.signup)
router.post('/signin',userController.signin)
router.post('/askquestions', verifyToken, checkRole(['user']), userController.askQuestions)
router.get('/getdetails/:user_Id', verifyToken, userController.showDetails)
// router.get('/getdetails/:user_Id',userController.showDetails)


module.exports = router