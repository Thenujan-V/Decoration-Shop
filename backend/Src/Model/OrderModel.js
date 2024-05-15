const dbConnection = require('../Config/Db.confic')

const order = function(order){
    this.status = order.status
    this.deadline = order.deadline
    this.user_Id = order.user_Id
}
const orderService = function(orderService){
    this.order_id = orderService.order_id
    this.service_id = orderService.service_id
    this.quantity = orderService.quantity
}

order.place_order = (orders) => {
    return new Promise((resolve, reject) => {
        try{
            const sql = `insert into order_table (status, deadline, user_Id) values (?, ?, ?)`
            dbConnection.execute(sql, [orders.status, orders.deadline, orders.user_Id], 
                    (err, res) => {
                        if(err){
                            reject(err)
                        }
                        else{
                            const showCardSql = `select card.service_id, card.quantity from card where user_Id = ?`
                            dbConnection.execute(showCardSql, [orders.user_Id], (err, response) => {
                                if(err){
                                    reject(err)
                                }
                                else{
                                    dbConnection.execute(`select max(order_table.order_id) as max_order_id from order_table where user_Id = ?`, [orders.user_Id], 
                                        (err, res) => {
                                            if(err){
                                                reject(err)
                                            }
                                            else{
                                                console.log('oooddd : ',res[0].max_order_id)
                                                const oId = res[0].max_order_id

                                                const addOrderServiceSql = `insert into order_service (order_id, service_id, quantity) values (?, ?, ?)`
                                                const deleteFromCart = `delete from card where service_id = ?`
                                                response.map((items) => {
                                                    dbConnection.execute(addOrderServiceSql, [oId, items.service_id, items.quantity], 
                                                        (err, res) => {
                                                            if(err){
                                                                reject(err)
                                                            }
                                                            else{
                                                                dbConnection.execute(deleteFromCart, [items.service_id], (err, deleteRes) => {
                                                                    if(err){
                                                                        reject(err)
                                                                    }
                                                                    else{
                                                                        resolve(deleteRes)
                                                                    }
                                                                })
                                                            }
                                                        }
                                                    )
                                            }) 
                                            }
                                        }
                                    )                                   
                                }
                            })
                        }
                    }
            )
        }
        catch(error){
            reject(error)
        }
    })
}


order.view_order_items = (user_Id) => {
    return new Promise((resolve, reject) => {
        try{
            const sql = `select * from order_table t join order_service s on t.order_id = s.order_id join service p on p.service_id = s.service_id where t.user_Id = ? `
            dbConnection.execute(sql, [user_Id], (err, res) => {
                if(err){
                    reject(err)
                }
                else{
                    resolve(res)
                }
            })
        }
        catch(error){
            reject(error)
        }
    })
}
order.get_least_order = (user_Id) => {
    return new Promise((resolve, reject) => {
        try{
            const sql = `select order_id from order_table where user_Id = ? order by order_date desc limit 1`
            dbConnection.execute(sql, [user_Id], (err, res) => {
                if(err){
                    reject(err)
                }
                else{
                    resolve(res)
                }
            })
        }
        catch(error){
            reject(error)
        }
    })
}






module.exports = order