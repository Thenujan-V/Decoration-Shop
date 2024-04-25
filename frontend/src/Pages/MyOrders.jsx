import React from 'react'

const MyOrders = () => {
  return (
    <div id='card'>
        <Navbar />
        <div className="container" >
            <h1>My Orders Details</h1>
            <table className="table" id='cart-items' style={{ backgroundColor: 'red' }}>
            <thead>
                <tr id='cardHead'>
                    <th className='col-3'>Title</th>
                    <th className='col-3'>Price</th>
                    <th className='col-3'>Ordered Date</th>
                    <th className='col-3'>Status</th>
                    <th className='col-3'>Delivery Date</th>

                </tr>
            </thead>
            <tbody>
                {ourservices.map((item, index) => (
                    <tr key={index} id='item' className='mb-5'>
                        <td className='col-3'>{item.title}</td>
                        <td className='col-3'>{item.price}</td>
                        <td className='col-3'>{item.orderedDate}</td>
                        <td className='col-3'>{item.status}</td>
                        <td className='col-3'>{item.deliveryDate}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    </div>
  )
}

export default MyOrders