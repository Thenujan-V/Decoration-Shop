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