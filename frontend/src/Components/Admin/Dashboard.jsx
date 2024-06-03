import React, { useEffect, useState } from 'react'
import AdminVerticalNav from './AdminVerticalNav'
import { changeAvailability, fetchServiceDetails, fetchServices } from '../../Services/ProductsService'
import { Link, useNavigate } from 'react-router-dom'
import { retrieveToken } from '../../Services/JwtToken'
import { getAllOrders } from '../../Services/OrderService'
import { showAssignedOrders } from '../../Services/AdminServices'

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
    const [apiResponse, setApiResponse] = useState([])
    const [deliveryNos, setDeliveryNos] = useState([])
    const [noOfOrders, setNoOfOrders] = useState([])
    const [noOfAssignedOrders, setNoOfAssignedOrders] = useState([])
    
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

       const getOrders = async () => {
            try{
                const response = await getAllOrders()
                setNoOfOrders(response.data.length)
            }
            catch(error){
                console.log('fetch services error :', error)
            }  
       }
       getOrders()


       const assignedOrders = async () => {
        try{
            const response = await showAssignedOrders()
            setNoOfAssignedOrders(response.data.length)

            const noOfToDeliver = response.data.reduce((acc, order) => order.work_status === 'delivery processing' ? acc + 1 : acc, 0)
            console.log('noonf :', noOfToDeliver)
            setDeliveryNos(noOfToDeliver)
        }
            catch(error){
                console.log('fetch services error :', error)
            }  
        }
        assignedOrders()

    }, [])

    const handleAvailablity = async (serviceId) => {
        try{
            const response = await changeAvailability(serviceId)
            setApiResponse(response.data)
            window.location.reload()
        }
        catch(error){
            console.log('error occur when change availability: ', error)
        }
    }

    
  return (
    <div style={{display:'flex'}}>
        <AdminVerticalNav />
        <div style={{flex:1}}>
            <div className="container adminDashboard">
                <div className="row boxes">
                    <div className="col-lg-6">
                        <div className='orders'>
                            <p>new orders</p>
                            <p>{noOfOrders - noOfAssignedOrders}</p>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className='delivery'>
                            <p>to deliver</p>
                            <p>{deliveryNos}</p>
                        </div>
                    </div>
                </div>
                
                <div className="row table">
                    <table>
                        <thead>
                            <tr>
                                <td>Service Id</td>
                                <td>Service Name</td>
                                <td>Image</td>
                                <td>Price</td>
                                <td>Description</td>
                                <td>Status</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                fetchAllServices && fetchAllServices.map((service) => (
                                    <tr key={service.service_id}>
                                        <td>id:{service.service_id}</td>
                                        <td>{service.service_name}</td>
                                        <td><img src={service.photoUrl} alt="image" width={'200px'} /></td>
                                        <td>{service.price} LKR</td>
                                        <td>{service.description}</td>
                                        <Link className='btn btn-warning m-3' onClick={() => handleAvailablity(service.service_id)}>{service.availability}</Link>
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