const dbConnection  = require('../Config/Db.confic')

const admins = function(user){
    this.user_Id = user.user_Id
}

admins.admins_signup = (admin) => {
    return new Promise((resolve, reject) => {
        try{
            const sql = `insert into admin (user_Id) values(?)`
            dbConnection.execute(sql, [admin.user_Id], (err, res) => {
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
        const sql = `select * from user`
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





module.exports = admins