import React from 'react'
import Navbar from '../Components/Navbar'
import { myOrders } from '../Components/Styles'

const MyOrders = () => {
    const orders = [
        {title : 'flower', price: '200', orderedDate:'20th july 2024', deliveryDate:'31st july 2024',status:'accepted' },
        {title : 'flowers', price: '200', orderedDate:'20th july 2024', deliveryDate:'31st july 2024', status:'cancelled' },
        {title : 'Bouquets', price: '200', orderedDate:'20th july 2024', deliveryDate:'31st july 2024', status:'finished' },
        {title : 'flower Bouquets', price: '200', orderedDate:'20th july 2024', deliveryDate:'31st july 2024', status:'on going' },
        {title : 'flower Bouquets', price: '200', orderedDate:'20th july 2024', deliveryDate:'31st july 2024', status:'delivered' }

    ]

    const addClassName = (status) => {
        if(status == 'accepted'){
            return 'accepted'
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
                {orders.map((order, index) => (
                    <div key={index} id='order' className='card col-lg-3 m-2' style={{width: '18rem'}}>
                        <h3>{order.title}</h3>
                        <p>Price :{order.price} LKR</p>
                        <p id='status' className = {`${addClassName(order.status)}`} >Status :{order.status}</p>
                        <p>Ordered Date :{order.orderedDate}</p>
                        <p>Delivery Date :{order.deliveryDate}</p>
                    </div>
                    
                ))}
            </div>
        </div>
    </div>
  )
}

export default MyOrders