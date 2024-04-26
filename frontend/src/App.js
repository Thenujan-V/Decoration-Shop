import React from 'react'
import Home from './Pages/Home'
import {Routes, Route} from 'react-router-dom'
import About from './Pages/About'
import Services from './Pages/Services'
import Signup from './Pages/Signup'
import ServiceDetails from './Pages/ServiceDetails'
import Card from './Pages/Card'
import MyOrders from './Pages/MyOrders'

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
        <Route path='/orders' element={<MyOrders />} />
        
        {/* <Route path="/contact" element={<ContactPage />} /> */}
      </Routes>
    </>
  )
}

export default App