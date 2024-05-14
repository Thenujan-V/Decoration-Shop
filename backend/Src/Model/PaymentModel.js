const dbConnection = require('../Config/Db.confic')

const reviews = function(payment){
    this.total_amount = payment.total_amount
    this.paid_amount = payment.paid_amount  
    this.balance_amount = payment.balance_amount
    this.referance_no = payment.referance_no
    this.order_id = payment.order_id    
}

function generateReferenceNumber() {
    const randomDigits = Math.floor(10000 + Math.random() * 90000);
    const referenceNumber = 'pay' + randomDigits;
    return referenceNumber;
}


reviews.add_payment = (payment) => {
    return new Promise((resolve, reject) => {
        try{
            const reference_no = generateReferenceNumber();
            const balance_amount = payment.total_amount - payment.paid_amount

            const sql = `insert into payments    (total_amount, paid_amount, balance_amount, referance_no, order_id) values (?, ?, ?, ?, ?)`
            dbConnection.execute(sql, [payment.total_amount, payment.paid_amount, balance_amount, reference_no, payment.order_id] ,
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




module.exports = reviews