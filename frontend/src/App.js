import React from 'react'
import Home from './Pages/Home'
import {Routes, Route} from 'react-router-dom'
import About from './Pages/About'
import Services from './Pages/Services'
import Signup from './Pages/Signup'
import ServiceDetails from './Pages/ServiceDetails'
import Card from './Pages/Card'
import MyOrders from './Pages/MyOrders'
import Payment from './Pages/Payment'
import VerticalNavbar from './Components/Employee/VerticalNavbar'
import Dashboard from './Components/Employee/Dashboard'
import PendingWorks from './Components/Employee/PendingWorks'
import OrderReq from './Components/Employee/OrderReq'
import Allowance from './Components/Employee/Allowance'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/service" element={<Services />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/servicedetails/:key" element={<ServiceDetails />} />
        <Route path="/card" element={<Card />} />
        <Route path='/payment' element={<Payment />} />
        <Route path='/orders' element={<MyOrders />} />
        <Route path='/ver' element={<VerticalNavbar />} />
        <Route path='/empdashboard' element={<Dashboard />} />
        <Route path='/pending/:order_id' element={<PendingWorks />} />
        <Route path='/orders/:order_id' element={<OrderReq />} />
        <Route path='/allowance' element={<Allowance />} />
        
        {/* <Route path="/contact" element={<ContactPage />} /> */}
      </Routes>
    </>
  )
}

export default App