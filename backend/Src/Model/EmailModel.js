const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

const dbConnection  = require('../Config/Db.confic')


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




exports.updateNotification = (data) => {
  return new Promise((resolve, reject) => {
      try{
          const sql = `update notification set reply_send = ? where notification_id = ?`
          dbConnection.execute(sql, ["1", data.nId], (err, res) => {
            if(err){
              reject(err)
            }
            else{
              resolve(res)
            }
          })
      }
      catch(error){
          reject(error)
      }
  })
}