const dbConnection = require('../Config/Db.confic')

const services = function(service){
    this.description = service.description
    this.service_name = service.service_name
    this.availability = service.availability
    this.price = service.price
}

services.add_service = (serviceDetails, image) => {
    // console.log('sd :', serviceDetails)
    // console.log('img :', image)
    return new Promise((resolve, reject) => {
        try{
            const sql = `insert into service (description, service_name, availability, price, photo) values (?, ?, ?, ?, ?)`
            dbConnection.execute(sql, [serviceDetails.description, serviceDetails.service_name, serviceDetails.availability, serviceDetails.price, image.filename], 
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

services.view_services = (services) => {
    return new Promise((resolve, reject) => {
        try{
            sql = `select * from service where availability = 'available'`
            dbConnection.execute(sql, (err, res) => {
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


services.view_service_details = (service_Id) => {
    return new Promise((reslove, reject) => {
        try{
            const sql = `select * from service where service_id = ?`
            dbConnection.execute(sql, [service_Id], (err, res) => {
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








module.exports = services