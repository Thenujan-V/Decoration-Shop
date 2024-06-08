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

exports.showAllAdmins = (req, res) => {
    adminModels.get_all_admin_details()
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

exports.showEmployeeDetails = (req,res) => {
    adminModels.get_employee_details(req.params.employee_id)
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

exports.showUserDetails = (req,res) => {
    adminModels.get_user_details(req.params.user_Id)
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


exports.empSignup = (req, res) => {
    adminModels.employee_signup(req.body)
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

exports.asignEmp = (req, res) => {
    adminModels.employee_asign(req.body)
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

exports.getQuestions = (req, res) => {
    adminModels.get_questions()
        .then((signupRes) => {
            console.log(signupRes)
            return res.status(200).json(signupRes)
        })
        .catch((err) => {
            return res.status(500).json({
                error : 'fetching faild',
                details : err.message
            })
        })
}

// SMS SEND USERS WITH Twilio

exports.sendSMSToUsers = (req, res) => {
    adminModels.send_SMS(req.params.id, req.body)
        .then((signupRes) => {
            return res.status(200).json({ success: true, message: signupRes.sid })
        })
        .catch((error) => {
            console.error('Error sending SMS:', error)
            return res.status(500).json({ success: false, error: error.message })
        })
}

exports.allowanceDetails = (req, res) => {
    adminModels.allowance_details(req.params.order_id)
        .then((allowance) => {
            return res.status(200).json(allowance)
        })
        .catch((err) => {
            return res.status(500).json({
                error : 'fetching faild',
                details : err.message
            })
        })
}

exports.assignedOrders = (req, res) => {
    adminModels.assigned_orders()
        .then((allowance) => {
            return res.status(200).json(allowance)
        })
        .catch((err) => {
            return res.status(500).json({
                error : 'fetching faild',
                details : err.message
            })
        })
}