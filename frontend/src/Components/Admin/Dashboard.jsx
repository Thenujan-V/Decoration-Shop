import React, { useEffect, useState } from 'react'
import AdminVerticalNav from './AdminVerticalNav'
import { fetchServiceDetails, fetchServices } from '../../Services/ProductsService'
import { Link, useNavigate } from 'react-router-dom'
import { retrieveToken } from '../../Services/JwtToken'

const Dashboard = () => {
    const navigate = useNavigate()
    const decoded = retrieveToken()
    
    useEffect(() => {
        if(decoded){
        const userRole = decoded.role
        if(userRole === 'user' || userRole === 'employee'){
            navigate('/unauthorized')
        }
        }
    }, [decoded])

    const [fetchAllServices, setFetchAllServices] = useState([])

    useEffect(() => {
       const fetchAllServices = async() => {
            try{
                const response = await fetchServices()
                setFetchAllServices(response)
            }
            catch(error){
                console.log('fetch services error :', error)
            }               
       }
       fetchAllServices()
    }, [])
    
  return (
    <div style={{display:'flex'}}>
        <AdminVerticalNav />
        <div style={{flex:1}}>
            <div className="container adminDashboard">
                <div className="row boxes">
                    <div className="col-lg-6">
                        <div className='orders'>
                            <p>new orders</p>
                            <p>07</p>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className='delivery'>
                            <p>to deliver</p>
                            <p>05</p>
                        </div>
                    </div>
                </div>
                
                <div className="row table">
                    <table>
                        <thead>
                            <tr>
                                <td>Service Id</td>
                                <td>Service Name</td>
                                <td>Description</td>
                                <td>Edit</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                fetchAllServices && fetchAllServices.map((service) => (
                                    <tr key={service.service_id}>
                                        <td>id:{service.service_id}</td>
                                        <td>{service.service_name}</td>
                                        <td>{service.description}</td>
                                        <Link className='btn btn-warning mt-1'>Edit</Link>
                                    </tr>
                                ))
                            }
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Dashboard