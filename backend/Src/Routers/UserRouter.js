const express = require('express')
const router = express.Router()
const userController = require('../Controller/UserController')

router.post('/signup',userController.signup)


module.exports = router