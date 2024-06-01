const dbConnection  = require('../Config/Db.confic')

const employees = function(employee){
    this.employee_id = employee.employee_id
    this.job_specialization = employee.job_specialization
    this.nic_num = employee.nic_num
    this.date_hired = employee.date_hired
    this.user_Id = employee.user_Id
}


employees.show_employee_details = (employee_id) => {
    return new Promise((resolve, reject) => {
        const sql = `select * from user u join employee a on u.user_Id = a.user_Id where u.user_Id = ?`
        dbConnection.execute(sql, [employee_id.employee_id], (err, res) => {
            if(err){
                reject(err)
            }
            else{
                resolve(res)
            }
        })
    })
}

employees.task_acceptance = (employee_id, order_id, data) => {
    console.log(employee_id, ' ', order_id ,' ',data )
    return new Promise((resolve, reject) => {
        const sql = `update emp_order set task_acceptence = ? where employee_id = ? and order_id = ?`
        dbConnection.execute(sql, [data.task_acceptence, employee_id, order_id], (err, res) => {
            if(err){
                reject(err)
            }
            else{
                resolve(res)
            }
        })
    })
}

employees.status_update = (employee_id, order_id, data) => {
    return new Promise((resolve, reject) => {
        const sql = `update emp_order set work_status = ? where employee_id = ? and order_id = ?`
        dbConnection.execute(sql, [data.work_status , employee_id, order_id], (err, res) => {
            if(err){
                reject(err)
            }
            else{
                const sqlOrder = `update order_table set status = ? where order_id = ?`
                dbConnection.execute(sqlOrder, [data.work_status , order_id], (err, response) => {
                    if(err){
                        reject(err)
                    }
                    else{
                        resolve(response)
                    }
                })
            }
        })
    })
}

employees.get_order_details = (employee_id) => {
    console.log(employee_id)
    return new Promise((resolve, reject) => {
        const sql = `select * from emp_order e join order_table o on e.order_id = o.order_id where e.employee_id = ?`
        dbConnection.execute(sql, [employee_id], (err, res) => {
            if(err){
                reject(err)
            }
            else{
                resolve(res)
            }
        })
    })
}

employees.show_order_details = (order_id) => {
    console.log(order_id)
    return new Promise((resolve, reject) => {
        const sql = `select * from order_table o join order_service s on o.order_id = s.order_id join service p on p.service_id = s.service_id where o.order_id = ?`
        dbConnection.execute(sql, [order_id], (err, res) => {
            if(err){
                reject(err)
            }
            else{
                resolve(res)
            }
        })
    })
}

employees.allowance_details = (employee_id, order_id) => {
    return new Promise((resolve, reject) => {
        const sql = `select * from allowance a join employee e on a.employee_id = e.employee_id where a.employee_id = ? and a.order_id = ?`
        dbConnection.execute(sql, [employee_id, order_id], (err, res) => {
            if(err){
                reject(err)
            }
            else{
                resolve(res)
            }
        })
    })
}

employees.all_allowances_details = (employee_id) => {
    return new Promise((resolve, reject) => {
        const sql = `select * from allowance a join employee e on a.employee_id = e.employee_id where a.employee_id = ?`
        dbConnection.execute(sql, [employee_id], (err, res) => {
            if(err){
                reject(err)
            }
            else{
                resolve(res)
            }
        })
    })
}

employees.allowance_status_update = (allowance_id, data) => {
    console.log(allowance_id, data)
    return new Promise((resolve, reject) => {
        const sql = `update allowance set allowance_status = ?, paid_amount = ?, balance_amount = ? where allowance_id = ?`
        dbConnection.execute(sql, [data.allowance_status, data.paid_amount, data.balance_amount , allowance_id], (err, res) => {
            if(err){
                reject(err)
            }
            else{   
                resolve(res)
            }
        })
    })
}






module.exports = employees