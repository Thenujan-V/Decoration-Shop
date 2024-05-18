const dbConnection  = require('../Config/Db.confic')

const employees = function(employee){
    this.employee_id = employee.employee_id
    this.job_specialization = employee.job_specialization
    this.nic_num = employee.nic_num
    this.date_hired = employee.date_hired
    this.user_Id = employee.user_Id
}


employees.show_employee_details = (employee_id) => {
    console.log(employee_id)
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




module.exports = employees