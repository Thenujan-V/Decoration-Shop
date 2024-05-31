import React, { useEffect, useState } from 'react'
import AdminVerticalNav from './AdminVerticalNav'
import { Link, useNavigate } from 'react-router-dom';
import { getAllEmployees } from '../../Services/AdminServices';
import { retrieveToken } from '../../Services/JwtToken';

const EmployeeManagement = () => {
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

    const [getEmployee, setGetEmployee] = useState([])

    useEffect(() => {
        const fetchEmployees = async () => {
            try{
                const response = await getAllEmployees()
                setGetEmployee(response.data)
            }
            catch(error){
                console.log('fetching employees error :', error)
            }
        }
        fetchEmployees()
    },[])
    
  return (
    <div style={{display:'flex', height:'100vh'}}>
        <AdminVerticalNav />
        <div style={{flex:1}} className='container empMgt'>
            <h1>EMPLOYEE MANAGEMENT</h1>
            <div className="row">
            {
                getEmployee && (
                    getEmployee.map((employee) => (
                        <div className="card col-lg-3">
                            <div className="img">
                                <div className="image">
                                    <p>{employee.user_name.charAt(0).toUpperCase()}</p>
                                </div>
                            </div>
                            <p>Employee Id - {employee.user_Id}</p>
                            <p>Employee Name - {employee.first_name}</p>
                            <p>Contact No - {employee.contact_no}</p>
                            <div className="btnn">
                                <Link to={`/viewemployee/${employee.user_Id}`} className='btn'>View</Link>
                            </div>
                        </div>
                    ))
                ) 
            }
            </div>
        </div>
    </div>
  )
}

export default EmployeeManagement