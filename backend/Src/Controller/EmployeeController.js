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