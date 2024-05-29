const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const Server = express()
const path = require('path');

const { verifyToken, checkRole } = require('./Src/Middlewares/authMiddleware');


Server.use(cors())
Server.use(express.json())
Server.use(bodyParser.json())

const userRouter = require('./Src/Routers/UserRouter')
const adminRouter = require('./Src/Routers/AdminRouter')
const employeeRouter = require('./Src/Routers/EmployeeRouter')
const servicesRouter = require('./Src/Routers/ServicesRouter')
const cardRouter = require('./Src/Routers/CardRouter')
const orderRouter = require('./Src/Routers/OrderRouter')
const reviewRouter = require('./Src/Routers/ReviewRouter')
const paymentRouter = require('./Src/Routers/PaymentRouter')


Server.use('/api/user', userRouter)
Server.use('/api/admin', verifyToken, checkRole('admin'), adminRouter)
Server.use('/api/employee', employeeRouter)
Server.use('/api/services', servicesRouter)
Server.use('/api/card', verifyToken, checkRole(['user']), cardRouter)
Server.use('/api/order', orderRouter)
Server.use('/api/review', reviewRouter)
Server.use('/api/payment', paymentRouter)

Server.use('/uploads', express.static(path.join(__dirname, 'uploads')));


module.exports = Server

const PORT = process.env.PORT || 3500

Server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})