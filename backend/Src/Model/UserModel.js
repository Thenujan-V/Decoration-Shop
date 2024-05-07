const dbConnection  = require('../Config/Db.confic')
const bcrypt = require('bcrypt');


const users = function(user){
    this.user_name = user.user_name
    this.mail_id = user.mail_id
    this.password = user.password
    this.first_name = user.first_name
    this.last_name = user.last_name
    this.house_no = user.house_no
    this.road_name = user.road_name
    this.city   = user.city
}

users.user_signup = function(user){

    return new Promise(async (resolve, reject) => {
            console.log(user)

            const saltRounds = 10;
            try{
                const hashPassword = await bcrypt.hash(user.password, saltRounds)
                user.password = hashPassword
    
                const sql = `insert into user (user_name, mail_id, password, first_name, last_name, house_no, road_name, city) values (?, ?, ?, ?, ?, ?, ?, ?)`
                dbConnection.execute(sql, [user.user_name, user.mail_id, user.password, user.first_name, user.last_name, user.house_no, user.road_name, user.city],
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



module.exports = users