import React, { useEffect, useState } from 'react'
import VerticalNavbar from './VerticalNavbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import { allowance } from '../Styles';
import { Link, useNavigate } from 'react-router-dom';
import { retrieveToken } from '../../Services/JwtToken';
import { getAllowanceDetails, getEmployeeDetails, getOrders, updateAllowanceStatus } from '../../Services/EmployeeService';

const Allowance = () => {
    const [user_Id, setuser_Id] = useState('')
    const navigate = useNavigate()
    const decodedToken = retrieveToken()

    useEffect(() => {
        if(decodedToken){
            const userId = decodedToken.id
            setuser_Id(userId)
        }
        else{
            navigate('/signin')
        }
    }, [])

    const [empId, setEmpId] = useState('')
    const [employee, setEmployee] = useState([])


    useEffect(() => {
        const fetchEmployeeDetails = async(user_Id) =>{
            try{
                const response = await getEmployeeDetails(user_Id)
                setEmpId(response.data[0].employee_id)
                setEmployee(response.data)
            }
            catch(error){
                console.log('fetching employee error :', error)
            }
        }
        fetchEmployeeDetails(user_Id)
    },[user_Id])

  
    const [allowanceReq, setAllowanceReq] = useState([])
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [orderReq, setOrderReq] = useState([])
    const [updateReq, setUpdateReq] = useState('')


    useEffect(() => {
        const fetchAllowances = async(empId) => {
            try{
                const response = await getAllowanceDetails(empId)
                setAllowanceReq(response.data)
            }
            catch(error){
                console.log('fetch allowance details error:', error.response)
            }
        }
        fetchAllowances(empId)

        const fetchEmployeeOrders = async(empId) => {
            try{
                const response = await getOrders(empId)
                console.log('res :', response.data)
                setOrderReq(response.data)

            }
            catch(error){
                console.log('error fetching orders :', error.response.data)
            }
        }
        fetchEmployeeOrders(empId)

    },[empId])

    const handleButtonClick = (allowance_id, data) => {
        console.log(data)
        try{
            const response = updateAllowanceStatus(allowance_id, data)
            setUpdateReq(response.data)
            window.location.reload();
        }
        catch(error){
            console.log('update allowance status error :', error.response)
        }
    };


  return (
    <div>
        <div style={{display:'flex'}}>
            <VerticalNavbar />
            <div style={{flex:1}} className='container allowance'>
                <h1>Allowance</h1>
                <div className='details'>
                    <div className="row head">
                        <h3 className='col-lg-3'>ORDER ID</h3>
                        <h3 className='col-lg-3'>W.STATUS</h3>
                        <h3 className='col-lg-3'>ALLOWANCE</h3>
                        <h3 className='col-lg-3'>A.STATUS</h3>
                    </div>
                    <div className="detail">
                        {
                            allowanceReq.map((allowance, index) => (
                                <div className="row">
                                    <p className='col-lg-3'> <Link to={`/pending/${allowance.order_id}/${empId}`} style={{color:'var(--background_blue)'}}>{allowance.order_id}</Link> </p>
                                    {
                                        orderReq && orderReq.map((order) => (
                                            order.order_id === allowance.order_id ? (
                                                <p className='col-lg-3'>{order.status}</p>
                                            ):null
                                        ))
                                    }
                                    <p className='col-lg-3'>{allowance.total_amount}</p>
                                    {allowance.allowance_status === '1' ? (
                                        <button
                                            className="btn col-lg-3"
                                            onClick={() => handleButtonClick(allowance.allowance_id, {allowance_status : '0', paid_amount: allowance.total_amount, balance_amount:0})}
                                        >
                                            <FontAwesomeIcon
                                                icon={faCircleCheck}
                                                size="xl"
                                                style={{ color: "#34b823" }}
                                            />
                                        </button>
                                    ) : (
                                        <button
                                            className="btn col-lg-3"
                                            onClick={() => handleButtonClick(allowance.allowance_id, {allowance_status : '1', paid_amount: allowance.total_amount, balance_amount:0})}
                                        >
                                            <FontAwesomeIcon
                                                icon={faCircle}
                                                size="xl"
                                                style={{ color: "#34b823" }}
                                            />
                                        </button>
                                    )}
                                
                                
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Allowance