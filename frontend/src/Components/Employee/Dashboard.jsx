import React, { useEffect, useState } from 'react'
import { dashboard } from '../Styles'
import VerticalNavbar from './VerticalNavbar'
import { Link, useNavigate } from 'react-router-dom'
import { getAllAllowanceDetails, getEmployeeDetails, getOrders } from '../../Services/EmployeeService'
import { retrieveToken } from '../../Services/JwtToken'

const Dashboard = () => {
    const [user_Id, setuser_Id] = useState('') 
    const navigate = useNavigate()
    const decodedToken = retrieveToken()

    useEffect(() => {
        if(decodedToken){
            const id = decodedToken.id
            setuser_Id(id)

            const userRole = decodedToken.role
            if(userRole === 'user' || userRole === 'admin'){
                navigate('/unauthorized')
            }
        }
        else{
            navigate('/signin')
        }
    }, [decodedToken])

    const [pendingWorks, setPendingWorks] = useState([])
    const [orderReq, setOrderReq] = useState([])
    const [completeWorks, setCompleteWorks] = useState([])
    const [employee, setEmployee] = useState([])
    const [empId, setEmpId] = useState('')
    const [allowance, setAllowance] = useState('')


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

    useEffect(() => {
        const fetchEmployeeOrders = async(empId) => {
            try{
                const response = await getOrders(empId)
                setOrderReq(response.data)

            }
            catch(error){
                console.log('error fetching orders :', error.response.data)
            }
        }
        fetchEmployeeOrders(empId)

        const fetchEmployeeAllowance = async(empId) => {
            try{
                const response = await getAllAllowanceDetails(empId)
                setAllowance(response.data)

            }
            catch(error){
                console.log('error fetching orders :', error.response.data)
            }
        }
        fetchEmployeeAllowance(empId)
    },[empId])


     
    const compeleted_works_count = orderReq.reduce((noOfCompleteWorks, work) => work.work_status === 'delivery processing' ? noOfCompleteWorks + 1 : noOfCompleteWorks, 0)

    const totalEarnings = allowance.length > 0 ? allowance.reduce((total, item) => item.allowance_status === "1" ? total + item.total_amount : total, 0) : 0;

    console.log('all :', allowance)

  return (
    <div style={{display:'flex'}}>
        <VerticalNavbar />
        <div style={{flex:1}}>
            <div className='container dashboard'>
                <div className="pending_works">
                    <h2>pending works</h2>
                        {
                            orderReq.length > 0 ?  orderReq.map((work, index) => (
                                work.task_acceptence === 1 && (work.work_status !== 'delivery processing' ) && (<div className="row work" key={index}>
                                    <div className="col-lg-8">
                                        <p className='p-0 m-0'>order_id : {work.order_id}</p>
                                        <p className='status'>{work.status}</p>
                                    </div>
                                    <div className="col-lg-4">
                                        <Link to={`/pending/${work.order_id}/${empId}`} className='link'>View</Link>
                                    </div>
                                </div>)
                            )):<p>No orders</p>
                        }
                </div>
                <div className="order_req">
                    <h2>Order Requests</h2>
                    {
                        orderReq.length > 0 && orderReq.map((order,index) => (
                             order.task_acceptence === null && (<div className="row work" key={index}>
                                <div className="col-lg-8">
                                    <p className='p-0 m-0'>order_id : {order.order_id}</p>
                                </div>
                                <div className="col-lg-4">
                                    <Link to={`/orders/${order.order_id}/${empId}`} className='link'>View</Link>
                                </div>
                            </div>)
                            
                        ))
                    }
                </div>
                <div className="complete_works">
                    <h2>Completed Works</h2>
                    {
                        orderReq &&  orderReq.map((work, index) => (
                            (work.work_status === 'delivery processing' ) && (
                            <div className="row work" key={index}>
                                <div className="col-lg-8">
                                    <p className='p-0 m-0'>order_id : {work.order_id}</p>
                                </div>
                                <div className="col-lg-4">
                                    <Link className='link'>View</Link>
                                </div>
                            </div>)
                        ))
                    }
                </div>
            </div>
            <div className="container other">
                <div className='earnings '>
                    <h1>Total Earnings</h1>
                    <p>{totalEarnings} LKR</p>
                </div>
                <div className='totalOrders'>
                    <h1>Total Completed Orders</h1>
                    <p>{compeleted_works_count}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Dashboard