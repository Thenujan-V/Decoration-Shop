const dbConnection  = require('../Config/Db.confic')

const employees = function(employee){
    this.employee_id = employee.employee_id
    this.job_specialization = employee.job_specialization
    this.nic_num = employee.nic_num
    this.date_hired = employee.date_hired
    this.user_Id = employee.user_Id
}


employees.showEmployeeDetails = (employee_id) => {
    return new Promise((resolve, reject) => {
        const sql = `select * from user u join employee a on u.user_Id = a.user_Id where admin_id = ?`
        dbConnection.execute(sql, [employee_id.admin_id], (err, res) => {
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