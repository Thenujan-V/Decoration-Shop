const cardModel = require('../Model/CardModel')

exports.addToCard = (req, res) => {
    cardModel.add_to_card(req.body)
        .then((cardRes) => {
            if(cardRes === 'itemExist'){
                return res.status(409).send(cardRes)
            }
            else{
                return res.status(201).send(cardRes)
            }
            
        })
        .catch((err) => {
            return res.status(501).json({
                error : 'adding card failed',
                details : err.message
            })
        })
}
exports.updateQuantity = (req, res) => {
    cardModel.update_quantity(req.body, req.params.service_id)
        .then((cardRes) => {
            return res.status(200).send(cardRes)
        })
        .catch((err) => {
            return res.status(501).json({
                error : 'update quantity failed',
                details : err.message
            })
        })
}

exports.showCard = (req, res) => {
    cardModel.show_card_items(req.params.user_Id)
        .then((cardRes) => {
            const fullUrl = req.protocol + '://' + req.get('host') + '/uploads/';
            cardRes = cardRes.map(service => ({
                ...service,
                photoUrl: fullUrl + service.photo
            }));
            return res.status(200).send(cardRes)
        })
        .catch((err) => {
        return res.status(501).json({
            error : 'fetch card items faild',
            details : err.message
        })
    })
}

exports.removeFromCard = (req, res) => {
    cardModel.remove_from_card(req.params.card_id)
        .then((cardRes) => {
            return res.status(200).send(cardRes)
        })
        .catch((err) => {
        return res.status(501).json({
            error : 'remove card items faild',
            details : err.message
        })
    })
}