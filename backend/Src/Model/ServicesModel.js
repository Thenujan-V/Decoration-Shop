const dbConnection = require('../Config/Db.confic')

const services = function(service){
    this.description = service.description
    this.service_name = service.service_name
    this.availability = service.availability
    this.price = service.price
}

services.add_service = (service) => {
    return new Promise((resolve, reject) => {
        try{
            const sql = `insert into service (description, service_name, availability, price) values (?, ?, ?, ?)`
            dbConnection.execute(sql, [service.description, service.service_name, service.availability, service.price], 
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



module.exports = services