import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import { myOrders } from '../Components/Styles'
import { retrieveToken } from '../Services/JwtToken'
import { getOrders } from '../Services/OrderService'
import { useNavigate } from 'react-router-dom'

const MyOrders = () => {
    const navigater = useNavigate()
    const decodedToken = retrieveToken()
    const [user_id, setUser_id] = useState('')

    useEffect(() => {
        if(decodedToken){
            const id = decodedToken.id
            setUser_id(id)
        }
        else{
            navigater('/signin')
        }
    }, [])
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
    }, [user_id])
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
    <div id='myOrders'>
        <Navbar />
        <div className="container" >
            <h1>My Orders Details</h1>
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
  )
}

export default MyOrders