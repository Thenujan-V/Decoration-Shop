const reviewModel = require('../Model/ReviewModel')

exports.addReview = (req, res) => {
    reviewModel.add_review(req.body)
        .then((reviewRes) => {
            return res.status(201).send(reviewRes)
        })
        .catch((err) => {
            return res.status(501).json({
                error : 'adding review is failed',
                details : err.message
            })
        })
}

exports.getReview = (req, res) => {
    reviewModel.get_review()
        .then((reviewRes) => {
            return res.status(200).send(reviewRes)
        })
        .catch((err) => {
            return res.status(501).json({
                error : 'getting review is failed',
                details : err.message
            })
        })
}