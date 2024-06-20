const emailModels = require('../Model/EmailModel.js')

exports.sendMail = (req, res) => {
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


exports.update_notification = (req, res) => {
    emailModels.updateNotification(req.body)
        .then((signupRes) => {
            return res.status(201).json(signupRes)
        })
        .catch((err) => {
            return res.status(500).json({
                error : 'update faild',
                details : err.message
            })
        })
}