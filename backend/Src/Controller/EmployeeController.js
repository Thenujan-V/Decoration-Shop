const employeeModels = require('../Model/EmployeeModel')


exports.signup = (req, res) => {
    employeeModels.employee_signup(req.body)
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