const dbConnection = require('../Config/Db.confic')

const cardTable = function(card){
    this.service_id = card.service_id
    this.quantity = card.quantity
    this.user_Id = card.user_Id
}

cardTable.add_to_card = (cardItems) => {
    return new Promise((resolve, reject) => {
        try{
            const selectSql = `select service_id from card where user_Id = ?`
            const sql = `insert into card (service_id, quantity, user_Id) values (? ,?, ?)`
            dbConnection.execute(selectSql, [cardItems.user_Id], 
                (err, response) => {
                    if(err){
                        reject(err)
                    }
                    else{
                        console.log(response)
                        const foundItem = response.find((service_ids) => service_ids && service_ids.service_id == cardItems.service_id)

                        if(foundItem){
                            resolve('itemExist')
                        }
                        else{
                            console.log('si : ',cardItems.service_id)
                            dbConnection.execute(sql, [cardItems.service_id,1, cardItems.user_Id], 
                                (err, res) => {
                                    if(err){
                                        reject(err)
                                    }
                                    else{
                                        resolve(res)
                                    }
                                })
                        }
                    }
                }
            )
            
        }
        catch(error){
            reject(error)
        }
    })
}

cardTable.update_quantity = (quantity, service_id) => {
    return new Promise((resolve, reject) => {
        try{
            const sql = `update card set quantity = ? where service_id = ?`
            dbConnection.execute(sql, [quantity.quantity, service_id], 
                (err, res) => {
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

cardTable.show_card_items = (user_Id) => {
    return new Promise((resolve, reject) => {
        try{
            const sql = `select * from card join service on card.service_id = service.service_id where card.user_Id = ?`
            dbConnection.execute(sql, [user_Id], 
                (err, res) => {
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

cardTable.remove_from_card = (card_id) => {
    return new Promise((resolve, reject) => {
        try{
            const sql = `delete from card where card_id = ?`
            dbConnection.execute(sql, [card_id], 
                (err, res) => {
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




module.exports = cardTable