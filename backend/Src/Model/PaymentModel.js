const dbConnection = require('../Config/Db.confic')

const payments = function(payment){
    this.total_amount = payment.total_amount
    this.paid_amount = payment.paid_amount  
    this.balance_amount = payment.balance_amount
    this.referance_no = payment.referance_no
    this.order_id = payment.order_id    
    this.method = payment.method    
}

function generateReferenceNumber() {
    const randomDigits = Math.floor(10000 + Math.random() * 90000);
    const referenceNumber = 'pay' + randomDigits;
    return referenceNumber;
}


payments.add_payment_method = (payment) => {
    return new Promise((resolve, reject) => {
        try{
            const reference_no = generateReferenceNumber();
            const balance_amount = payment.total_amount

            const selectSql = `select referance_no from payments`
            dbConnection.execute(selectSql, (err, response) => {
                if(err){
                    reject(err)
                }
                else{
                    const found_no = response.find((reference) => (reference.referance_no === reference_no))
                    if(found_no){
                        generateReferenceNumber()
                    }
                    else{
                        const foundSql = `select * from payments where order_id = ?`
                        dbConnection.execute(foundSql, [payment.order_id], (err, res) => {
                            if(err){
                                reject(err)
                            }
                            else{
                                if(res.length === 0){
                                    const sql = `insert into payments (total_amount, paid_amount, balance_amount, referance_no, order_id, method) values (?, ?, ?, ?, ?, ?)`
                                    dbConnection.execute(sql, [payment.total_amount, 0, balance_amount, reference_no, payment.order_id, payment.method] ,
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
                                else{
                                    const updateSql = `update payments set method = ? where order_id = ?`
                                    dbConnection.execute(updateSql, [payment.method, payment.order_id], (err, res) => {
                                        if(err){
                                            reject(err)
                                        }
                                        else{
                                            resolve(res)
                                        }
                                    })
                                }
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

payments.add_payment = (paymentData) => {
    return new Promise((resolve, reject) => {
        console.log('dd : ',paymentData)
        try{
            const sql = `update payments set paid_amount = ? ,balance_amount = ? where order_id = ?`
            dbConnection.execute(sql, [paymentData.paid_amount, 0, paymentData.order_id], (err, res) => {
                if(err){
                    reject(err)
                }
                else{
                    console.log(res)
                    resolve(res)
                }
            })
        }
        catch(error){
            reject(error)
        }
    })
}

payments.payment_details = (order_id) => {
    return new Promise((resolve, reject) => {
        try{
            const sql = `select * from payments where order_id = ?`
            dbConnection.execute(sql, [order_id], (err, res) => {
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



module.exports = payments