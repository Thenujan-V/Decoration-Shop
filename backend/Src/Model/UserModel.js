const dbConnection  = require('../Config/Db.confic')

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

users.user_signup = function(user, result){
    console.log(user)
    const sql = `insert into user (user_name, mail_id, password, first_name, last_name, house_no, road_name, city) values (?, ?, ?, ?, ?, ?, ?, ?)`
    dbConnection.execute(sql, [user.user_name, user.mail_id, user.password, user.first_name, user.last_name, user.house_no, user.road_name, user.city],
                            function(err, res){
                                if(err){
                                    result(err, null)
                                }
                                else{
                                    result(null, res)
                                }
                            }
    )
               
}

module.exports = users