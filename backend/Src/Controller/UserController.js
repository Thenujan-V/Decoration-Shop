var userModels = require('../Model/UserModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const secret_key = 'sdfghgfdasdfghjhtrewqwertyuytrewqaxcvbhuytrewsxcvhytrewasxcvghytrewsxcvbhytrewsxcvghytrewazxcvgtrewazxcvghytrewasxcg'

exports.signup = (req, res) => {
    userModels.user_signup(req.body)
       .then(signupRes => {
            return res.status(201).json(signupRes)
       }) 
       .catch(err => {
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
                return res.status(404).json({error: 'mail  wrong'})
            }

            if (!req.body.password || !signinRes[0].password) {
                throw new Error('data and hash arguments required');
            }

            const passwordMatch = await bcrypt.compare(req.body.password, signinRes[0].password)

            if(passwordMatch && signinRes[0].active === 1 ){
                const token = jwt.sign({"id":signinRes[0].user_Id, "role":signinRes[0].role}, secret_key, { expiresIn: '24h' });
                return res.status(200).json({
                    jwtToken:token,
                    message: 'successfully signin'
                })
            }
            else{
                return res.status(401).json({error: 'Invalid credentials.'})
            }

        })
        .catch(err => {
            return res.status(501).json({
                error: 'Signin failed. Please try again.',
                details: err.message,
            })
        })
}

exports.showDetails = (req, res) => {
    userModels.show_user_details(req.params)
        .then((detailsRes) => {
            return res.status(200).json(detailsRes)
        })
        .catch(err => {
            return res.status(500).json({
                error: 'connot fetching data',
                details: err.message
            })
        })

}

exports.askQuestions = (req, res) => {    
    userModels.ask_questions(req.body)
        .then((detailsRes) => {
            return res.status(201).json(detailsRes)
        })
        .catch(err => {
            console.log('err :',err)

            return res.status(500).json({
                error: 'connot add data',
                details: err.message
            })
        })

}

exports.deleteAccount = (req, res) => {
    userModels.delete_account(req.params.user_Id)
        .then((Res) => {
            return res.status(200).send(Res)
        })
        .catch((err) => {
            return res.status(500).json({
                error: 'changa availability error',
                details: err.message
            })
        })
}