const paymentModel = require('../Model/PaymentModel')

exports.addPaymentMethod = (req, res) => {
    paymentModel.add_payment_method(req.body)
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