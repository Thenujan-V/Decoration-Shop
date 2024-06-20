const express = require('express')
const router = express.Router()

const emailController = require('../Controller/EmailController')

router.post('/sendmail',emailController.sendMail)
router.put('/update',emailController.update_notification)


module.exports = router