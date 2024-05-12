const servicesModel = require('../Model/ServicesModel')

exports.addServices = (req, res) => {
    servicesModel.add_service(req.body)
        .then((serviceRes) => {
            return res.status(201).send(serviceRes)
        })
        .catch((err) => {
            return res.status(500).json({
                error: 'adding faild',
                details: err.message
            })
        })
}