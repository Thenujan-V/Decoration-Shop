const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const Server = express()

Server.use(cors())
Server.use(express.json())
Server.use(bodyParser.json())

const userRouter = require('./Src/Routers/UserRouter')
const adminRouter = require('./Src/Routers/AdminRouter')
const employeeRouter = require('./Src/Routers/EmployeeRouter')

Server.use('/api/user', userRouter)
Server.use('/api/admin', adminRouter)
Server.use('/api/admin', employeeRouter)



module.exports = Server

const PORT = process.env.PORT || 3500

Server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})