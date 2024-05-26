const mysql = require('mysql2')


var connection = mysql.createPool({
    host:'127.0.0.1',
    port:'3306',
    user: 'root',
    password: 'Thenu2000@',
    database: 'sara_flower_decorations',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

connection.getConnection(function(err){
    if(err) throw err;
    console.log('conected')
}) 

module.exports = connection