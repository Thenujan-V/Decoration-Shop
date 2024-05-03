import React, { useEffect, useState } from 'react'
import AdminVerticalNav from './AdminVerticalNav'
import { Link } from 'react-router-dom';

const EmployeeManagement = () => {
    const employees = [
        { id: 'E001', name: 'John Doe', createdDate:'10th july 2203' },
        { id: 'E002', name: 'Cane Smith', createdDate:'12th sep 2203' },{ id: 'E002', name: 'Jane Smith', createdDate:'12th june 2203' },{ id: 'E002', name: 'Jane Smith', createdDate:'12th june 2203' },{ id: 'E002', name: 'Jane Smith', createdDate:'12th june 2203' },
        { id: 'E003', name: 'Alice Johnson', createdDate:'15th july 2203' }
    ];

    const [getEmployee, setGetEmployee] = useState([])

    useEffect(() => {
        setGetEmployee(employees)
    },[])
    console.log('res :',getEmployee)
    
    const getResponse = () => {
        return getEmployee.length > 0 ? getEmployee[0] : null
    }
    const isApiResponse = getResponse()

  return (
    <div style={{display:'flex', height:'100vh'}}>
        <AdminVerticalNav />
        <div style={{flex:1}} className='container empMgt'>
            <h1>EMPLOYEE MANAGEMENT</h1>
            <div className="row">
            {
                isApiResponse && (
                    getEmployee.map((employee) => (
                        <div className="card col-lg-3">
                            <div className="img">
                                <div className="image">
                                    <p>{employee.name.charAt(0).toUpperCase()}</p>
                                </div>
                            </div>
                            <p>Employee Id - {employee.id}</p>
                            <p>Name - {employee.name}</p>
                            <p>Date Joined - {employee.createdDate}</p>
                            <div className="btnn">
                                <Link to='' className='btn'>View</Link>
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