const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const Server = express()

Server.use(cors())
Server.use(express.json())
Server.use(bodyParser.json())

const userRouter = require('./Src/Routers/UserRouter')

Server.use('/api/user', userRouter)



module.exports = Server

const PORT = process.env.PORT || 3500

Server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})