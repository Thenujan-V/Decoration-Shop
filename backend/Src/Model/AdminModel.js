const dbConnection  = require('../Config/Db.confic')

const admins = function(user){
    this.user_Id = user.user_Id
}

const setAdminId = () => {
    const prefix = 'ADMIN_'
    const randomNo = Math.floor(10000 + Math.random() * 90000)
    const adminId = prefix + randomNo
    return adminId
}
const adminId = setAdminId()

const setEmployeeId = () => {
    const prefix = 'EMP_'
    const randomNo = Math.floor(10000 + Math.random() * 90000)
    const adminId = prefix + randomNo
    return adminId
}
const employeeId = setEmployeeId()

admins.admins_signup = (admin) => {
    return new Promise((resolve, reject) => {
        try{

            const selectSql = `select admin_id from admin`
            dbConnection.execute(selectSql, (err, res) => {
                if(err){
                    reject(err)
                }
                else{
                    const admin_Id = adminId;
                    const found_adminId = res.find((obj) => obj.admin_id === admin_Id)
                    if(found_adminId){
                       setAdminId() 
                    }
                    else{
                        const sql = `insert into admin (admin_id, user_Id) values(?, ?)`
                        dbConnection.execute(sql, [adminId, admin.user_Id], (err, res) => {
                            if(err){
                                reject(err)
                            }
                            else{
                                const sql_2 = `update user set role = 'admin' where user_Id = ?`
                                dbConnection.execute(sql_2, [admin.user_Id] , (err, res) => {
                                    if(err){
                                        reject(err)
                                    }
                                    else{
                                        resolve(res)
                                    }
                                })
                            }
                        })
                    }
                }
            })

            
            
        }
        catch(error){
            reject(error)
        }
    })
}

admins.show_admin_details = (admin_id) => {
    return new Promise((resolve, reject) => {
        const sql = `select * from user u join admin a on u.user_Id = a.user_Id where admin_id = ?`
        dbConnection.execute(sql, [admin_id.admin_id], (err, res) => {
            if(err){
                reject(err)
            }
            else{
                resolve(res)
            }
        })
    })
}

admins.get_all_employees_details = () => {
    return new Promise((resolve, reject) => {
        const sql = `select * from user u join employee e on u.user_Id = e.user_Id`
        dbConnection.execute(sql, (err, res) => {
            if(err){
                reject(err)
            }
            else{
                resolve(res)
            }
        })
    })
}

admins.get_all_users_details = () => {
    return new Promise((resolve, reject) => {
        const sql = `select * from user where role = 'user'`
        dbConnection.execute(sql, (err, res) => {
            if(err){
                reject(err)
            }
            else{
                resolve(res)
            }
        })
    })
}

admins.get_employee_details = (user_Id) => {    
    return new Promise((resolve, reject) => {
        const sql = `select * from user join employee on user.user_Id = employee.user_Id where user.user_Id = ?`
        dbConnection.execute(sql, [user_Id], (err, res) => {
            if(err){
                
                reject(err)
            }
            else{
                resolve(res)
            }
        })
    })
}

admins.get_user_details = (user_Id) => {    
    return new Promise((resolve, reject) => {
        const sql = `select * from user where user_Id = ?`
        dbConnection.execute(sql, [user_Id], (err, res) => {
            if(err){
                
                reject(err)
            }
            else{
                resolve(res)
            }
        })
    })
}

admins.employee_signup = (employee) => {
    return new Promise((resolve, reject) => {
        try{
            const selectSql = `select employee_id from employee`
            dbConnection.execute(selectSql, (err, res) => {
                if(err){
                    reject(err)
                }
                else{
                    const emp_Id = employeeId;
                    const found_empId = res.find((obj) => obj.emp_id === emp_Id)
                    if(found_empId){
                       setEmployeeId() 
                    }
                    else{
                        const sql = `insert into employee (employee_id, job_specialization, nic_num, user_Id) values(?, ?, ?, ?)`
                        dbConnection.execute(sql, [employeeId,employee.job_specialization, employee.nic_num, employee.user_Id], (err, res) => {
                            if(err){
                                reject(err)
                            }
                            else{
                                const sql_2 = `update user set role = 'employee' where user_Id = ?`
                                dbConnection.execute(sql_2, [employee.user_Id] , (err, res) => {
                                    if(err){
                                        reject(err)
                                    }
                                    else{
                                        resolve(res)
                                    }
                                })
                            }
                        })
                    }
                }
            })
        }
        catch(error){
            reject(error)
        }
    })
}

admins.employee_asign = (data) => {    
    return new Promise((resolve, reject) => {
        const sql = `insert into emp_order (order_id, employee_id, cash_allowance) values (?, ?, ?)`
        dbConnection.execute(sql, [data.order_id, data.employee_id, data.cash_allowance], (err, res) => {
            if(err){
                reject(err)
            }
            else{
                resolve(res)
            }
        })
    })
}

admins.get_questions = () => {    
    return new Promise((resolve, reject) => {
        const sql = `select * from contactus c join user u on c.user_Id = u.user_Id`
        dbConnection.execute(sql, (err, res) => {
            if(err){
                reject(err)
            }
            else{
                resolve(res)
            }
        })
    })
}

admins.send_SMS = (id, data) => {    
    console.log('data backend :', data)
    return new Promise((resolve, reject) => {
        client.messages.create({
            body: `Answer to your question: ${data.answer}`,
            from: 'your_twilio_phone_number',
            to: data.userPhoneNumber
          }, (err, res) => {
            if(err){
                reject(err)
            }
            else{
                resolve(res)
            }
          })
    })
}



module.exports = admins

