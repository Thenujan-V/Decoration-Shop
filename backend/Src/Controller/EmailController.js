const emailModels = require('../Model/EmailModel.js')

exports.sendMail = (req, res) => {
    console.log('req :', req.body)
    emailModels.send_email(req.body)
        .then((signupRes) => {
            return res.status(201).json(signupRes)
        })
        .catch((err) => {
            return res.status(500).json({
                error : 'signup faild',
                details : err.message
            })
        })
}