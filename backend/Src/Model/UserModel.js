const dbConnection  = require('../Config/Db.confic')
const bcrypt = require('bcrypt');


const users = function(user){
    this.user_name = user.user_name
    this.mail_id = user.mail_id
    this.password = user.password
    this.first_name = user.first_name
    this.last_name = user.last_name
    this.address = user.address
    this.contact_no = user.contact_no
}

users.user_signup = function(user){

    return new Promise(async (resolve, reject) => {
            console.log(user)

            const saltRounds = 10;
            try{
                const hashPassword = await bcrypt.hash(user.password, saltRounds)
                user.password = hashPassword
    
                const sql = `insert into user (user_name, mail_id, password, first_name, last_name, adress, contact_no) values (?, ?, ?, ?, ?, ?, ?)`
                dbConnection.execute(sql, [user.user_name, user.mail_id, user.password, user.first_name, user.last_name, user.address, user.contact_no],
                                        (err, res) => {
                                            if(err){
                                                reject(err)
                                            }
                                            else{
                                                resolve(res)
                                            }
                                        }
                )
            }
            catch(error){
                reject(error)
            }
            })
               
}

users.user_signin = function(signinRes){
    return new Promise((resolve, reject) => {
        const sql = `select * from user where mail_id = ?`
        dbConnection.execute(sql, [signinRes.mail_id], 
            (err, res) => {
                if(err){
                    reject(err)
                }
                else{
                    resolve(res)
                }
            }
        )
    })
}

users.show_user_details = (user_Id) => {
    return new Promise((resolve, reject) => {
        const sql = `select * from user where user_Id = ?`
        dbConnection.execute(sql, [user_Id.user_Id], (err, res) => {
            if(err){
                reject(err)
            }
            else{
                resolve(res)
            }
        })
    })
}

users.ask_questions = (datas) => {
    return new Promise((resolve, reject) => {
        const sql = `insert into notification (notification_type, recipien, content) values (?, ?, ?)`
        const [result] = dbConnection.execute(sql, ['', 'admin', datas.message], (err, res) => {
            if(err){
                reject(err)
            }
            else{
                const sqlSelect = `SELECT notification_id FROM notification ORDER BY notification_id DESC LIMIT 1`
                dbConnection.execute(sqlSelect, (error, response) => {
                    if(error){
                        reject(error)
                    }
                    else{
                        console.log(response[0].notification_id)
                        const sql2 = `insert into user_notification (notification_id, user_Id) values (?, ?)`
                        dbConnection.execute(sql2, [response[0].notification_id, datas.user_Id], (err, res) => {
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
        })
    })
}

users.delete_account = (user_Id) => {
    return new Promise((reslove, reject) => {
        try{
            const sql = `update user set active = 0 where user_Id = ?`
            dbConnection.execute(sql, [user_Id], (err, res) => {
                if(err){
                    reject(err)
                }
                else{
                    reslove(res)
                }
            }) 
        }
        catch(error){
            reject(error)
        }
    })
}


module.exports = users