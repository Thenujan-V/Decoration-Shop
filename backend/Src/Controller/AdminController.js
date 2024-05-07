const adminModels = require('../Model/AdminModel')

exports.signup = (req, res) => {
    adminModels.admins_signup(req.body)
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


exports.showAdminDetails = (req, res) => {
    adminModels.show_admin_details(req.params)
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

exports.showAllEmployees = (req, res) => {
    adminModels.get_all_employees_details()
        .then((response) => {
            res.status(200).json(response)
        })
        .catch((err) => {
            res.status(500).json({
                error: 'connot fetching data',
                details: err.message
            })
        })
}

exports.showAllUsers = (req,res) => {
    adminModels.get_all_users_details()
        .then((response) => {
            res.status(200).json(response)
        })
        .catch((err) => {
            res.status(500).json({
                error: 'connot fetching data',
                details: err.message
            })
        })
}