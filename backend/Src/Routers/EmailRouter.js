const express = require('express')
const router = express.Router()

const emailController = require('../Controller/EmailController')

router.post('/sendmail',emailController.sendMail)


module.exports = router