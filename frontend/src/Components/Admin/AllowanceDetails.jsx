import React, { useEffect, useState } from 'react'
import AdminVerticalNav from './AdminVerticalNav'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { retrieveToken } from '../../Services/JwtToken'

const AllowanceDetails = () => {
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

    const emp_id = useParams()

    const payment = [
        {emp_id:'E001' ,total:'4000', paid:'1500'},
        {emp_id:'E003' ,total:'4000', paid:'1500'},
        {emp_id:'E004' ,total:'4000', paid:'1500'},
        {emp_id:'E005' ,total:'4000', paid:'1500'},
    ]

    const [allowance, setAllowance] = useState()
    const [employee, setEmployee] = useState('')

    useEffect(() => {
        setAllowance(payment)
    },[])

    const findEmployee = allowance?.find((allowances) => allowances.emp_id === emp_id.emp_id)
    useEffect(() => {
        setEmployee(findEmployee)
    })
  return (
    <div>
        <div style={{display:'flex'}}>
        <AdminVerticalNav />
        <div style={{flex:1}} className='container payments'>
            <h1>EMPLOYEE MANAGEMENT</h1>
            {
                employee && 
                <div>
                        {<h2>{employee.emp_id}</h2>}
                        <div className="details">
                            <h3 >ALLOWANCE DETAILS</h3>
                            <div className='detail'>
                                <p className='qes'>TOTAL AMOUNT </p>
                                <p className='ans'>- {employee.total}</p>
                            </div>
                            <div className='detail'>
                                <p className='qes'>PAID AMOUNT</p>
                                <p className='ans'>- {employee.paid}</p>
                            </div>
                            <div className='detail'>
                                <p className='qes'>TO PAY </p>
                                <p className='ans'>- {employee.total - employee.paid}</p>
                            </div>
                        </div>
                        <div className="buttons">
                            <Link to='' className='btn hand'>PAY ON HAND</Link>
                            <Link to='' className='btn now'>PAY NOW</Link>
                        </div>
                        
                </div>
            }
        </div>
        </div>
    </div>
  )
}

export default AllowanceDetails