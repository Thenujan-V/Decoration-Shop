import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import VerticalNavbar from '../Employee/VerticalNavbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import AdminVerticalNav from './AdminVerticalNav'
import { getOrders } from '../../Services/OrderService'

const ViewOrders = () => {
    const Id = useParams()
    const user_id = Id.user_Id

    const [orders, setOrders] = useState([])

    useEffect(() => {
        const fetchOrders = async (user_id) => {
            try{
                const response = await getOrders(user_id)
                console.log('res: ', response)
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
        if(status == 'accepted'){
            return 'accepted'
        }
        else if(status == 'payment pending'){
            return 'pending'
        }
        else if(status == 'cancelled'){
            return 'cancelled'
        }
        else if(status == 'finished'){
            return 'finished'
        }
        else if(status == 'on going'){
            return 'onGoing'
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
              status:order.status
            };
          }
          groups[order_id].orders.push(order);
          groups[order_id].totalPrice += parseFloat(order.price) * order.quantity;
          return groups;
        }, {});
      };
      const groupedOrders = groupOrdersById(orders);
  return (
    <div>
        <div style={{display:'flex', height:'100vh'}}>
        <AdminVerticalNav />
        <div style={{flex:1}} className='container allowance'>
            <h1>EMPLOYEE MANAGEMENT</h1>
            <div id="orders" className="row justify-content-center">
                {Object.keys(groupedOrders).length > 0 ? (
                    Object.keys(groupedOrders).map((orderId, index) => (
                    <div key={index} id={`order-group-${orderId}`} className="card m-2" >
                        <h2>Order ID :  {orderId}</h2>
                        <div className="row">
                            <div className='col-lg-7 details'>
                                {groupedOrders[orderId].orders.map((order, subIndex) => (
                                <div key={subIndex} className="details m-2">
                                    <h4>{order.service_name} ({order.quantity} * {order.price}) = {order.quantity * order.price}</h4>
                                    {/* <p>Price: {order.price} LKR</p> */}
                                </div>
                                ))} 
                            </div>
                            <div className='dates col-lg-5'>
                                <p className={`${addClassName(groupedOrders[orderId].status)}`}>Status - {groupedOrders[orderId].status}</p>
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