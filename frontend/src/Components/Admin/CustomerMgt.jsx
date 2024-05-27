import React, { useEffect, useState } from 'react'
import AdminVerticalNav from './AdminVerticalNav'
import { Link, useNavigate } from 'react-router-dom';
import { getAllCustomers } from '../../Services/AdminServices';
import { retrieveToken } from '../../Services/JwtToken';

const CustomerMgt = () => {
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

    const [getCustomers, setGetCustomers] = useState([])

    useEffect(() => {
        const fetchCust = async() => {
            try{
                const response =await getAllCustomers()
                setGetCustomers(response.data)
            }
            catch(error){
                console.log('fetching error :', error)
            }
        }
        fetchCust()
    },[])

  return (
    <div style={{display:'flex'}}>
        <AdminVerticalNav />
        <div style={{flex:1}} className='container customers'>
            <h1>CUSTOMER MANAGEMENT</h1>
            {
                getCustomers &&
                <div className='details'>
                    {
                        getCustomers &&
                        getCustomers.map((customer) => (
                            <div className="row">
                                <p className='col-lg-3 col-md-3 col-3'>{customer.user_Id}</p>
                                <p className='col-lg-3 col-md-3 col-3 name'>{customer.first_name}</p>
                                <Link to={`/viewCustomer/${customer.user_Id}`} className='btn col-lg-3 col-md-3 col-3 view'>View</Link>
                                <Link className='btn col-lg-3 col-md-3 col-3 delete'>delete</Link>
                            </div>
                        ))
                    }
                </div>
            }
        </div>
    </div>
  )
}

export default CustomerMgt