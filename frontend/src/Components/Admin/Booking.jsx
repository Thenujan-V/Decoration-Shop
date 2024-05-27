import React, { useEffect, useState } from 'react'
import VerticalNavbar from '../Employee/VerticalNavbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import AdminVerticalNav from './AdminVerticalNav'
import { allowance } from '../Styles'
import { Link, useNavigate } from 'react-router-dom'
import { getAllOrders } from '../../Services/OrderService'
import { retrieveToken } from '../../Services/JwtToken'

const Booking = () => {
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

    const [apiReq, setApiReq] = useState([])
    const [selectedOrderId, setSelectedOrderId] = useState(null);


    useEffect(() => {
        const fetchOrders = async () => {
            try{
                const response = await getAllOrders()
                console.log('rd :', response.data)
                setApiReq(response.data)
            }
            catch(error){
                console.log('error get oreders ', error)
            }
        }
        fetchOrders()
    },[])

    const handleButtonClick = (orderId) => {
        if (selectedOrderId === orderId) {
            setSelectedOrderId(null); 
        } else {
            setSelectedOrderId(orderId);
        }
    };
console.log('soid : ',selectedOrderId)
  return (
    <div style={{display:'flex'}}>
        <AdminVerticalNav />
        <div style={{flex:1}} className='container allowance'>
            <h1>ORDERS</h1>
                <div className='details'>
                    <div className="row head">
                        <h3 className='col-lg-3'>ORDER ID</h3>
                        <h3 className='col-lg-3'>STATUS</h3>
                        <h3 className='col-lg-3'>View Details</h3>
                        <h3 className='col-lg-3'>PAYMENT</h3>
                    </div>
                    <div className="detail">
                        {
                            apiReq && apiReq.map((order, index) => (
                                <div className="row">
                                    <p className='col-lg-3'>ORDER_ID {order.order_id}</p>
                                    <p className='col-lg-3'>{order.status}</p>
                                    <div className='col-lg-3 text-center'>
                                        <Link to={`/employeeassign/${order.order_id}`} className='btn button' >View</Link>
                                    </div>
                                    {/* <button className='btn col-lg-3'  id="not_okey"><FontAwesomeIcon icon={faCircle} size='xl' style={{color: "#34b823"}}/></button> */}
                                    { order.payment_status === 'completed' ? <button className="btn col-lg-3">
                                        <FontAwesomeIcon
                                                    icon={faCircleCheck}
                                                    size="2xl" 
                                                    style={{ color: "rgb(10, 101, 71)" }}
                                                />
                                        </button>:
                                        selectedOrderId === order.order_id ? (
                                            <button 
                                                className="btn col-lg-3"
                                                onClick={() => handleButtonClick(order.order_id)}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faCircleCheck}
                                                    size="2xl" 
                                                    style={{ color: "#rgb(10, 101, 71)" }}
                                                />
                                            </button>
                                        ) : (
                                            <button
                                                className="btn col-lg-3"
                                                onClick={() => handleButtonClick(order.order_id)}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faCircle}
                                                    size="2xl"
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
  )
}

export default Booking