import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import AdminVerticalNav from './AdminVerticalNav';
import { showUserDetail } from '../../Services/AdminServices';
import { retrieveToken } from '../../Services/JwtToken';
import { deleteAccount } from '../../Services/UserService';
import { toast } from 'react-toastify';

const ViewCustomer = () => {
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

    const Id = useParams()
    const user_Id = Id.user_Id
    
    const [getCustomers, setGetCustomers] = useState([])
    const [apiResponse, setApiResponse] = useState([])

    useEffect(() => {
        const fetchUser = async(user_Id) => {
            try{
                const response = await showUserDetail(user_Id)
                setGetCustomers(response.data[0])
            }
            catch(error){
                console.log('error fetching user details :' ,error)
            }
        }
        fetchUser(user_Id)
    },[])
    console.log('ok :',getCustomers)


    const handleDeleteAccount = (user_Id) => {
        try{
          const response = deleteAccount(user_Id)
          setApiResponse(response.data)
          toast.success('deleted employee', {
             autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
            window.location.reload()
        }
        catch(error){
          console.log('error occur :', error)
          toast.error('user delete failed.', {
             autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
        }
      };

  return (
    <div style={{display:'flex'}}>
        <AdminVerticalNav />
        <div style={{flex:1}} className='container empMgt'>
            <h1>CUSTOMERS MANAGEMENT</h1>
            { getCustomers && 
                <div>
                    <h2>{getCustomers.id}</h2>
                    <div className="details">
                    <div className='detail'>
                            <p className='qes'>USER ID</p>
                            <p className='ans'>- {getCustomers.user_Id}</p>
                        </div>
                        <div className='detail'>
                            <p className='qes'>NAME</p>
                            <p className='ans'>- {getCustomers.first_name} {getCustomers.last_name}</p>
                        </div>
                        <div className='detail'>
                            <p className='qes'>CONTACT NO</p>
                            <p className='ans'>- {getCustomers.contact_no}</p>
                        </div>
                        <div className='detail'>
                            <p className='qes'>EMAIL ID</p>
                            <p className='ans'>- {getCustomers.mail_id}</p>
                        </div>
                        <div className='detail'>
                            <p className='qes'>ADDRESS</p>
                            <p className='ans'>- {getCustomers.adress}</p>
                        </div>
                    </div>
                    <div className="buttons">
                        <Link to={`/vieworders/${getCustomers.user_Id}`} className='btn history'>VIEW ORDER HISTORY</Link>
                        <Link onClick={() => handleDeleteAccount(user_Id)} className='btn delete'> DELETE PROFILE</Link>
                    </div>
                </div>
                
            }
        </div>
    </div>
  )
}

export default ViewCustomer