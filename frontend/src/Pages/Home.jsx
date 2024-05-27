import React, { useEffect } from 'react'
import Navbar from '../Components/Navbar'
import {home} from '../Components/Styles'
import { useNavigate } from 'react-router-dom'
import { retrieveToken } from '../Services/JwtToken'
const Home = () => {
  const navigate = useNavigate()
  const decoded = retrieveToken()

  useEffect(() => {
    if(decoded){
      const userRole = decoded.role
      if(userRole === 'admin' || userRole === 'employee'){
        navigate('/unauthorized')
      }
    }
  }, [decoded]) 

  return (
    <>
        <Navbar />
        <div id='home'>
            <div className="container">
            <div className="row">
                <div className="col-lg-6" id='homeImg'></div>
                <div className="col-lg-6" id='homeContent'>
                    <p>
                    Welcome to Sara Decorations, your go
                    to destination for exquisite handcrafted 
                    decorations and personalized gifts. 
                    Nestled in the heart of Jaffna, we take 
                    pride in bringing your celebrations to life 
                    with our unique and artistic creations
                    </p>
                    <button className='btn'>Book now</button>
                </div>
            </div>
            </div>
        </div>
    </>
  )
}

export default Home