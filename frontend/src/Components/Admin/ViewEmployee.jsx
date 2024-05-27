import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import AdminVerticalNav from './AdminVerticalNav';
import { showEmployeeDetail } from '../../Services/AdminServices';
import { retrieveToken } from '../../Services/JwtToken';

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

    const Id = useParams()
    const user_Id = Id.user_Id
    
    const [getEmployee, setGetEmployee] = useState([])

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
    },[])
    console.log('ok :',getEmployee)

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
                            <p className='qes'>NIC NO</p>
                            <p className='ans'>- {getEmployee.nic_num}</p>
                        </div>
                        <div className='detail'>
                            <p className='qes'>CONTACT NO</p>
                            <p className='ans'>- {getEmployee.contact_no}</p>
                        </div>
                        <div className='detail'>
                            <p className='qes'>DATE HIRED</p>
                            <p className='ans'>- {getEmployee.date_hired}</p>
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
                        <Link to={`/vieworders/${getEmployee.user_Id}`} className='btn history'>VIEW ORDER HISTORY</Link>
                        <Link to='' className='btn delete'> DELETE PROFILE</Link>
                    </div>
                </div>
                
            }
        </div>
    </div>
  )
}

export default ViewEmployee