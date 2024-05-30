const servicesModel = require('../Model/ServicesModel')

exports.addServices = (req, res) => {
    servicesModel.add_service(req.body, req.file)
        .then((serviceRes) => {
            const fullUrl = req.protocol + '://' + req.get('host') + '/uploads/' + req.file.filename;
            serviceRes.photoUrl = fullUrl;
            return res.status(201).send(serviceRes)
        })
        .catch((err) => {
            return res.status(500).json({
                error: 'adding faild',
                details: err.message
            })
        })
}

exports.viewServices = (req, res) => {
    servicesModel.view_services()
        .then((serviceRes) => {
            const fullUrl = req.protocol + '://' + req.get('host') + '/uploads/';
            serviceRes = serviceRes.map(service => ({
                ...service,
                photoUrl: fullUrl + service.photo
            }));

            return res.status(200).send(serviceRes)
        })
        .catch((err) => {
            return res.status(501).json({
                error : 'geting services faild',
                details : err.message
            })
        })
}

exports.viewServiceDetails = (req, res) => {
    servicesModel.view_service_details(req.params.service_id)
        .then((serviceRes) => {
            const fullUrl = req.protocol + '://' + req.get('host') + '/uploads/';
            serviceRes = serviceRes.map(service => ({
                ...service,
                photoUrl: fullUrl + service.photo
            }));
            return res.status(200).send(serviceRes)
        })
        .catch((err) => {
            return res.status(500).json({
                error: 'getting service details faild',
                details: err.message
            })
        })

}

exports.updateAvailability = (req, res) => {
    servicesModel.update_availability(req.params.service_id)
        .then((serviceRes) => {
            return res.status(200).send(serviceRes)
        })
        .catch((err) => {
            return res.status(500).json({
                error: 'changa availability error',
                details: err.message
            })
        })
} 

