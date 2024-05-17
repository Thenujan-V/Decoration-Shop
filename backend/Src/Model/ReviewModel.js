const dbConnection = require('../Config/Db.confic')

const reviews = function(review){
    this.rating = review.rating
    this.review = review.review
    this.date_hired = review.date_hired
    this.user_Id = review.user_Id
}

reviews.add_review = (review) => {
    return new Promise((resolve, reject) => {
        try{
            const sql = `insert into rate (rating, review, user_Id) values (?, ?, ?)`
            dbConnection.execute(sql, [review.rating, review.review, review.user_Id] ,
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

reviews.get_review = (reviews) => {
    return new Promise((resolve, reject) => {
        try{
            const sql = `select * from rate r join user u on r.user_Id = u.user_Id`
            dbConnection.execute(sql,
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





module.exports=reviews