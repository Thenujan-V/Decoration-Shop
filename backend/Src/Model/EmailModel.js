const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

const emailUsername = 'vthenujan7400@gmail.com'
const password = 'Velthasan07'

exports.send_email = (data) => {
    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: emailUsername,
              pass: password
            }
          });

          const { to, subject, text } = data
    
        const mailOptions = {
          from: emailUsername,
          to,
          subject,
          text
        }

        transporter.sendMail(mailOptions, (err, res) => {
            if(err){
                reject(err)
            }
            else{
                resolve(res)
            }
        });
    })
}