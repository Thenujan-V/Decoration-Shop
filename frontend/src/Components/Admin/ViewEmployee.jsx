import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import AdminVerticalNav from './AdminVerticalNav';
import { showEmployeeDetail } from '../../Services/AdminServices';
import { retrieveToken } from '../../Services/JwtToken';
import { deleteAccount } from '../../Services/UserService';
import { toast } from 'react-toastify';

const ViewEmployee = () => {
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

    const[user_Id, setUser_Id] = useState('')
    const Id = useParams()
    useEffect(() => {
        if(Id.employee_id){
            setUser_Id(Id.employee_id)
        }
    },[Id])

    
    const [getEmployee, setGetEmployee] = useState([])
    const [apiResponse, setApiResponse] = useState([])
    
    useEffect(() => {
        const fetchEmployee = async (user_Id) => {
            try{
                const response = await showEmployeeDetail(user_Id)
                setGetEmployee(response.data[0])
            }
            catch(error){
                console.log('employeee details fetching error :', error)
            }
        }
        fetchEmployee(user_Id)
    },[user_Id])


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
            <h1>EMPLOYEE MANAGEMENT</h1>
            { getEmployee && 
                <div>
                    <h2>{getEmployee.id}</h2>
                    <div className="details">
                    <div className='detail'>
                            <p className='qes'>NAME</p>
                            <p className='ans'>- {getEmployee.first_name}</p>
                        </div>
                        <div className='detail'>
                            <p className='qes'>Emoloyee Id</p>
                            <p className='ans'>- {getEmployee.employee_id}</p>
                        </div>
                        <div className='detail'>
                            <p className='qes'>NIC NO</p>
                            <p className='ans'>- {getEmployee.nic_num}</p>
                        </div>
                        <div className='detail'>
                            <p className='qes'>CONTACT NO</p>
                            <p className='ans'>- {getEmployee.contact_no}</p>
                        </div>
                        <div className='detail'>
                            <p className='qes'>DATE HIRED</p>
                            <p className='ans'>- {new Date(getEmployee.created_date).toLocaleDateString() }</p>
                        </div>
                        <div className='detail'>
                            <p className='qes'>EMAIL ID</p>
                            <p className='ans'>- {getEmployee.mail_id}</p>
                        </div>
                        <div className='detail'>
                            <p className='qes'>ADDRESS</p>
                            <p className='ans'>- {getEmployee.adress}</p>
                        </div>
                        <div className='detail'>
                            <p className='qes'>JOB SPECIFICATION</p>
                            <p className='ans'>- {getEmployee.job_specialization}</p>
                        </div>
                        {/* <div className='detail'>
                            <p className='qes'>ACCOUNT DETAILS</p>
                            <p className='ans'>- {getEmployee.name}</p>
                        </div> */}
                    </div>
                    <div className="buttons">
                        <Link to={`/viewemporders/${getEmployee.employee_id}`} className='btn history'>VIEW ORDER HISTORY</Link>
                        <Link onClick={() => handleDeleteAccount(user_Id)} className='btn delete'> DELETE PROFILE</Link>
                    </div>
                </div>
                
            }
        </div>
    </div>
  )
}

export default ViewEmployee