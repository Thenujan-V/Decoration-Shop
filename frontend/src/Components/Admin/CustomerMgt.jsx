import React, { useEffect, useState } from 'react'
import AdminVerticalNav from './AdminVerticalNav'
import { Link, useNavigate } from 'react-router-dom';
import { getAllCustomers } from '../../Services/AdminServices';
import { retrieveToken } from '../../Services/JwtToken';
import { deleteAccount } from '../../../../backend/Src/Controller/UserController';

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
                console.log('cusr :', response.data)
                setGetCustomers(response.data)
            }
            catch(error){
                console.log('fetching error :', error)
            }
        }
        fetchCust()
    },[])

    const handleDeleteAccount = (user_Id) => {
        try{
          const response = deleteAccount(user_Id)
          setApiResponse(response.data)
          window.location.reload()
        }
        catch(error){
          console.log('error occur :', error)
        }
      };


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
                                {
                                customer.active === 1 ? <Link className='btn col-lg-3 col-md-3 col-3 delete' onClick={(e) => handleDeleteAccount(customer.user_Id)}>delete</Link> :
                                    <Link className='btn col-lg-3 col-md-3 col-3 delete' style={{backgroundColor:'darkRed'}}>Deactive</Link>
                                }
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