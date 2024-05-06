var userModels = require('../Model/UserModel')

exports.signup = (req, res) => {
    console.log('ooo')
    userModels.user_signup(req.body, function(err, signupRes){
        if(err){
            return res.send(err)
        }
        else{
            return res.send(signupRes)
        }
    })
}