import React, { useEffect, useState } from 'react'
import { dashboard } from '../Styles'
import VerticalNavbar from './VerticalNavbar'
import { Link, useNavigate } from 'react-router-dom'
import { getEmployeeDetails } from '../../Services/EmployeeService'
import { retrieveToken } from '../../Services/JwtToken'

const Dashboard = () => {
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

    const pending_works = [
        {order_id:'1123', status:'work started'},
        {order_id:'1124', status:'work started'},
        {order_id:'1125', status:'work started'}
    ]
    const order_req = [
        {order_id:'1123', status:'work started'},
        {order_id:'1123', status:'work started'},
        {order_id:'1123', status:'work started'}
    ]
    const complete_works = [
        {order_id:'1123', status:'work started'},
        {order_id:'1123', status:'work started'}
    ]

    const [pendingWorks, setPendingWorks] = useState([])
    const [orderReq, setOrderReq] = useState([])
    const [completeWorks, setCompleteWorks] = useState([])
    const [employee, setEmployee] = useState([])
    const [empId, setEmpId] = useState('')


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
        setPendingWorks(pending_works)
        setOrderReq(order_req)
        setCompleteWorks(complete_works)
    },[user_Id])

    useEffect(() => {

    })

     
// console.log(' empid: ', empId)


  return (
    <div style={{display:'flex'}}>
        <VerticalNavbar />
        <div style={{flex:1}}>
            <div className='container dashboard'>
                <div className="pending_works">
                    <h2>pending works</h2>
                        {
                            pendingWorks.map((work, index) => (
                                <div className="row work" key={index}>
                                    <div className="col-lg-8">
                                        <p className='p-0 m-0'>order_id : {work.order_id}</p>
                                        <p className='status'>{work.status}</p>
                                    </div>
                                    <div className="col-lg-4">
                                        <Link to={`/pending/${work.order_id}`} className='link'>View</Link>
                                    </div>
                                </div>
                            ))
                        }
                </div>
                <div className="order_req">
                    <h2>Order Requests</h2>
                    {
                        orderReq.map((order,index) => (
                            <div className="row work" key={index}>
                                <div className="col-lg-8">
                                    <p className='p-0 m-0'>order_id : {order.order_id}</p>
                                </div>
                                <div className="col-lg-4">
                                    <Link to={`/orders/${order.order_id}`} className='link'>View</Link>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="complete_works">
                    <h2>Completed Works</h2>
                    {
                        completeWorks.map((work, index) => (
                            <div className="row work" key={index}>
                                <div className="col-lg-8">
                                    <p className='p-0 m-0'>order_id : {work.order_id}</p>
                                </div>
                                <div className="col-lg-4">
                                    <Link className='link'>View</Link>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="container other">
                <div className='earnings '>
                    <h1>Total Earnings</h1>
                    <p>30,000 LKR</p>
                </div>
                <div className='totalOrders'>
                    <h1>Total Completed Orders</h1>
                    <p>45</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Dashboard