const orderModel = require('../Model/Ordermodel')

exports.placeOrder = (req, res) => {
    orderModel.place_order(req.body)
        .then((orderRes) => {
            return res.status(201).send(orderRes)
        })
        .catch((err) => {
            return res.status(501).json({
                error : 'place order faild',
                dettails : err.message
            })
        })
}

exports.viewOrders = (req, res) => {
    orderModel.view_order_items(req.params.user_Id)
        .then((orderRes) => {
            return res.status(200).send(orderRes)
        })
        .catch((err) => {
            return res.status(501).json({
                error : 'view order items faild',
                dettails : err.message
            })
        })          
}