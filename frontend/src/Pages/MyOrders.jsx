import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import { myOrders } from '../Components/Styles'
import { retrieveToken } from '../Services/JwtToken'
import { getOrders } from '../Services/OrderService'

const MyOrders = () => {
    const decodedToken = retrieveToken()
    const user_id = decodedToken.id

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


  return (
    <div id='myOrders'>
        <Navbar />
        <div className="container" >
            <h1>My Orders Details</h1>
            <div id='orders' className='row justify-content-center'>
                {   orders && orders ? orders.map((order, index) => (
                    <div key={index} id='order' className='card col-lg-3 m-2' style={{width: '18rem'}}>
                        <h3>{order.service_name}</h3>
                        <p>Price :{order.price} LKR</p>
                        <p id='status' className = {`${addClassName(order.status)}`} >Status :{order.status}</p>
                        <p>Ordered Date : {new Date(order.order_date).toLocaleDateString('en-US')}</p>
                        <p>Delivery Date : {new Date(order.deadline).toLocaleDateString('en-US')}</p>
                    </div>
                    
                )): <p>There is no orders</p>
            }
            </div>
        </div>
    </div>
  )
}

export default MyOrders