import React, { useEffect, useState } from 'react'
import {useNavigate, useParams } from 'react-router-dom'
import AdminVerticalNav from './AdminVerticalNav'
import { getOrders } from '../../Services/OrderService'
import { myOrders } from '../Styles'
import { retrieveToken } from '../../Services/JwtToken'

const ViewOrders = () => {
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
    const user_id = Id.user_Id

    const [orders, setOrders] = useState([])

    useEffect(() => {
        const fetchOrders = async (user_id) => {
            try{
                const response = await getOrders(user_id)
                setOrders(response.data)
            }
            catch(error){
                console.log('error occur :', error)
            }
        }
        fetchOrders(user_id)
    }, [])
    console.log('order : ', orders)

    const addClassName = (status) => {
        if(status == 'completed'){
            return 'completed'
        }
        else if(status == 'payment pending'){
            return 'pending'
        }
        else if(status == 'cancel'){
            return 'cancelled'
        }
        else if(status == 'delivery processing'){
            return 'finished'
        }
        else if(status == 'on going'){
            return 'onGoing'
        }
        else if(status == 'finished'){
            return 'finished'
        }
        else if(status == 'waiting'){
            return 'waiting'
        }
        else if(status == 'delivered'){
            return 'devlivered'
        }
    
    }
    
    const groupOrdersById = (orders) => {
        return orders.reduce((groups, order) => {
          const { order_id } = order;
          if (!groups[order_id]) {
            groups[order_id] = {
              orders: [],
              totalPrice: 0,
              order_date: order.order_date,
              deadline: order.deadline,
              status:order.status,
              payment_status:order.payment_status
            };
          }
          groups[order_id].orders.push(order);
          groups[order_id].totalPrice += parseFloat(order.price) * order.quantity;
          return groups;
        }, {});
      };
      const groupedOrders = groupOrdersById(orders);
  return (
    <div id='myOrders'>
        <div style={{display:'flex'}}>
        <AdminVerticalNav />
        <div style={{flex:1}} className='container'>
            <h1 className='text-center'>Orders Details</h1>
            <div id="orders" className="row justify-content-center">
                {Object.keys(groupedOrders).length > 0 ? (
                    Object.keys(groupedOrders).map((orderId, index) => (
                    <div key={index} id={`order-group-${orderId}`} className="card m-2" >
                        <h2>Order ID :  {orderId}</h2>
                        <div className="row">
                            <div className="col-lg-7 details">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Service Name</th>
                                            <th>Quantity</th>
                                            <th>Price</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {groupedOrders[orderId].orders.map((order, subIndex) => (
                                            <tr key={subIndex}>
                                                <td>{order.service_name}</td>
                                                <td>{order.quantity}</td>
                                                <td>{order.price}</td>
                                                <td>{order.quantity * order.price}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className='dates col-lg-5'>
                                <p className={`${addClassName(groupedOrders[orderId].status)}`}>Status - {groupedOrders[orderId].status}</p>
                                <p className={`${addClassName(groupedOrders[orderId].payment_status)}`}>Payment - {groupedOrders[orderId].payment_status}</p>
                                <p>Total Amount - {groupedOrders[orderId].totalPrice} LKR</p>
                                <p>Ordered Date - {new Date(groupedOrders[orderId].order_date).toLocaleDateString('en-US')}</p>
                                <p>Delivery Date - {new Date(groupedOrders[orderId].deadline).toLocaleDateString('en-US')}</p>       
                            </div>  
                        </div>
                    </div>
                    ))
                ) : (
                    <p>There are no orders</p>
                )}
                </div> 
        </div>
        </div>
    </div>
  )
}

export default ViewOrders