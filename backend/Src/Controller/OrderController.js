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

exports.getLeastOrder = (req, res) => {
    orderModel.get_least_order(req.params.user_Id)
     .then((orderRes) => {
        return res.status(200).send(orderRes)
        })
        .catch((err) => {
            return res.status(501).json({
                error : 'Get order items faild',
                dettails : err.message
            })
        })      
}

exports.viewAllOrders = (req, res) => {
    orderModel.get_all_orders()
     .then((orderRes) => {
        return res.status(200).send(orderRes)
        })
        .catch((err) => {
            return res.status(501).json({
                error : 'Get order items faild',
                dettails : err.message
            })
        })      
}

exports.viewOrdersDetails = (req, res) => {
    orderModel.view_order_details(req.params.order_id)
     .then((orderRes) => {
        const fullUrl = req.protocol + '://' + req.get('host') + '/uploads/';
        orderRes = orderRes.map(service => ({
                ...service,
                photoUrl: fullUrl + service.photo
            }));
        return res.status(200).send(orderRes)
        })
        .catch((err) => {
            return res.status(501).json({
                error : 'Get order details faild',
                dettails : err.message
            })
        })      
} 
exports.updatePaymentStatus = (req, res) => {
    orderModel.update_payment_status(req.params.order_id, req.body)
     .then((orderRes) => {
        return res.status(200).send(orderRes)
        })
        .catch((err) => {
            return res.status(501).json({
                error : 'update order status faild',
                dettails : err.message
            })
        })      
}