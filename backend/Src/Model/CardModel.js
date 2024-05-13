const dbConnection = require('../Config/Db.confic')

const cardTable = function(card){
    this.service_id = card.service_id
    this.quantity = card.quantity
}

cardTable.add_to_card = (cardItems) => {
    return new Promise((resolve, reject) => {
        try{
            const sql = `insert into card (service_id, quantity) values (? ,?)`
            dbConnection.execute(sql, [cardItems.service_id,1], 
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






module.exports = cardTable