const employeeModels = require('../Model/EmployeeModel')

exports.showEmployeeDetails = (req, res) => {
    employeeModels.show_employee_details(req.params)
        .then((detailsRes) => {
            res.status(200).json(detailsRes)
        })
        .catch(err => {
            res.status(500).json({
                error: 'connot fetching data',
                details: err.message
            })
        })
}

exports.taskAcceptance = (req, res) => {
    employeeModels.task_acceptance(req.params.employee_id, req.params.order_id, req.body)
        .then((detailsRes) => {
            res.status(201).json(detailsRes)
        })
        .catch(err => {
            res.status(500).json({
                error: 'connot update data',
                details: err.message
            })
        })
}

exports.statusUpdate = (req, res) => {
    employeeModels.status_update(req.params.employee_id, req.params.order_id, req.body)
        .then((detailsRes) => {
            res.status(201).json(detailsRes)
        })
        .catch(err => {
            res.status(500).json({
                error: 'connot update data',
                details: err.message
            })
        })
}
exports.getOrderDetails = (req, res) => {
    employeeModels.get_order_details(req.params.employee_id)
        .then((detailsRes) => {
            res.status(200).json(detailsRes)
        })
        .catch(err => {
            res.status(500).json({
                error: 'connot get datas',
                details: err.message
            })
        })
}

exports.showOrderDetails = (req, res) => {
    employeeModels.show_order_details(req.params.order_id)
        .then((detailsRes) => {
            const fullUrl = req.protocol + '://' + req.get('host') + '/uploads/';
            detailsRes = detailsRes.map(service => ({
                ...service,
                photoUrl: fullUrl + service.photo
            }));
            res.status(200).json(detailsRes)
        })
        .catch(err => {
            res.status(500).json({
                error: 'connot get datas',
                details: err.message
            })
        })
}
exports.allowanceDetails = (req, res) => {
    employeeModels.allowance_details(req.params.employee_id, req.params.order_id)
        .then((detailsRes) => {
            res.status(200).json(detailsRes)
        })
        .catch(err => {
            res.status(500).json({
                error: 'connot get datas',
                details: err.message
            })
        })
}

exports.allowanceStatusUpdate = (req, res) => {
    employeeModels.allowance_status_update(req.params.allowance_id, req.body)
        .then((detailsRes) => {
            res.status(200).json(detailsRes)
        })
        .catch(err => {
            res.status(500).json({
                error: 'connot update status',
                details: err.message
            })
        })
}

exports.allallowancesDetails = (req, res) => {
    employeeModels.all_allowances_details(req.params.employee_id)
        .then((detailsRes) => {
            res.status(200).json(detailsRes)
        })
        .catch(err => {
            res.status(500).json({
                error: 'connot get datas',
                details: err.message
            })
        })
}