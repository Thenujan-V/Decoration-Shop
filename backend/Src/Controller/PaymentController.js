const paymentModel = require('../Model/PaymentModel')

exports.addPayment = (req, res) => {
    paymentModel.add_payment(req.body)
        .then((paymentRes) => {
            return res.status(201).send(paymentRes)
        })
        .catch((err) => {
            return res.status(501).json({
                error : 'adding payment is failed',
                details : err.message
            })
        })
}
