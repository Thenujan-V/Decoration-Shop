var userModels = require('../Model/UserModel')
const bcrypt = require('bcrypt')

exports.signup = (req, res) => {
    userModels.user_signup(req.body)
       .then(signupRes => {
            return res.status(201).json(signupRes)
       }) 
       .catch(err => {
            console.error('signup error :',err)
            return res.status(500).json({
                error: 'Signup failed. Please try again later.',
                details: err.message,
            })
       })
}

exports.signin = (req, res) => {
    userModels.user_signin(req.body)
        .then(async signinRes => {
            if(signinRes.length === 0){
                res.status(404).json({error: 'mail  wrong'})
            }

            if (!req.body.password || !signinRes[0].password) {
                throw new Error('data and hash arguments required');
            }

            const passwordMatch = await bcrypt.compare(req.body.password, signinRes[0].password)

            if(passwordMatch){
                res.status(201).json({message: 'successfully signin'})
            }
            else{
                res.status(401).json({error: 'Invalid credentials.'})
            }

        })
        .catch(err => {
            res.status(500).json({
                error: 'Signin failed. Please try again.',
                details: err.message,
            })
        })
}


