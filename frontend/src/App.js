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
import AdminVerticalNav from './Components/Admin/AdminVerticalNav'
import Admindashboard from './Components/Admin/Dashboard'
import Booking from './Components/Admin/Booking'
import AssignEmployee from './Components/Admin/AssignEmployee'
import EmployeeManagement from './Components/Admin/EmployeeManagement'
import ViewEmployee from './Components/Admin/ViewEmployee'
import ViewOrders from './Components/Admin/ViewOrders'
import AllowanceDetails from './Components/Admin/AllowanceDetails'
import CustomerMgt from './Components/Admin/CustomerMgt'
import ViewCustomer from './Components/Admin/ViewCustomer'
import Review from './Pages/Review'


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
        <Route path='/adminpanel' element={<AdminVerticalNav />} />
        <Route path='/admindashboard' element={<Admindashboard />} />
        <Route path='/booking' element={<Booking />} />
        <Route path='/employeeassign/:order_id' element={<AssignEmployee />} />
        <Route path='/employeeManagement' element={<EmployeeManagement />} />
        <Route path='/viewemployee/:emp_id' element={<ViewEmployee />} />
        <Route path='/vieworders/:emp_id' element={<ViewOrders />} />
        <Route path='/allowanceDetails/:emp_id' element={<AllowanceDetails />} />
        <Route path='/customerMgt' element={<CustomerMgt />} />
        <Route path='/viewCustomer/:cust_id' element={<ViewCustomer />} />
        <Route path='/review' element={<Review />} />

        
        {/* <Route path="/contact" element={<ContactPage />} /> */}
      </Routes>
    </>
  )
}

export default App