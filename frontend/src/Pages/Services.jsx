import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import { aboutback } from '../Components/Assets'
import { Link } from 'react-router-dom'
import { fetchServices } from '../Services/ProductsService'

const Services = () => {
    const [serviceRes, setServiceRes] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await fetchServices()
                console.log('response : ', response)
                setServiceRes(response)
            }
            catch(error){
                console.log('error occur :', error)
            }
        }
    fetchData()

    },[])
  return (
    <>
        <Navbar />
        <div id="service">
            <div className="container">
                <h1>We transform your dreams into tangible beauty</h1>
                <div className="row justify-content-center">
                    {
                        serviceRes && serviceRes.map((service) => (
                            <div class="card col-lg-3 m-3" style={{width: '18rem'}} key={service.service_id}>
                                <img src={aboutback} class="card-img-top" alt="" />
                                <div class="card-body ">
                                    <h5 class="card-title">{service.service_name}</h5>
                                    <p class="card-title" style={{fontWeight:'bold'}}>{service.price}LKR</p>
                                    <p class="card-text">{service.description}</p>
                                    <Link to={`/servicedetails/${service.service_id}`} class="btn" >LEARN MORE</Link>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    </>
  )
}

export default Services