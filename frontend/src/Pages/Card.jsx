import React from 'react'
import Navbar from '../Components/Navbar'
import { Link } from 'react-router-dom'
import { card } from '../Components/Styles'
import { useNavigate } from 'react-router-dom'

const Card = () => {
    const navigater = useNavigate()

    const ourservices = [
        {title : 'flower', image: 'https://www.wishque.com/data/images/products/8931/18259175_722703353812_0.98404200-1646116247.jpg', price: '200' , details : 'Welcome to Sara Decorations, your go-to destination for exquisite handcrafted decorations and personalized gifts. Nestled in the heart of Jaffna, we take pride in bringing your celebrations to life with our unique and artistic creations'},
        {title : 'flowers',  image: 'https://www.wishque.com/data/images/products/8931/18259175_722703353812_0.98404200-1646116247.jpg', price: '200' , details : 'Welcome to Sara Decorations, your go-to destination for exquisite handcrafted decorations and personalized gifts. Nestled in the heart of Jaffna, we take pride in bringing your celebrations to life with our unique and artistic creations'},
        {title : 'Bouquets',  image: 'https://www.wishque.com/data/images/products/8931/18259175_722703353812_0.98404200-1646116247.jpg', price: '200' , details : 'Welcome to Sara Decorations, your go-to destination for exquisite handcrafted decorations and personalized gifts. Nestled in the heart of Jaffna, we take pride in bringing your celebrations to life with our unique and artistic creations'},
        {title : 'flower Bouquets',  image: 'https://www.wishque.com/data/images/products/8931/18259175_722703353812_0.98404200-1646116247.jpg', price: '200' , details : 'Welcome to Sara Decorations, your go-to destination for exquisite handcrafted decorations and personalized gifts. Nestled in the heart of Jaffna, we take pride in bringing your celebrations to life with our unique and artistic creations'},
    ]
    const handleDelete = (key) => {
        console.log('key : ',key)
    }
    const handleOrder = () => {
        console.log('api for add to order table')
        navigater('/payment')
    }
  return (
    <div id='card'>
        <Navbar />
        <div className="container" >
            <h1>Card</h1>
            <table className="table" id='cart-items' style={{ backgroundColor: 'red' }}>
            <thead>
                <tr id='cardHead'>
                    <th className='col-3'>Title</th>
                    <th className='col-3'>Image</th>
                    <th className='col-3'>Price</th>
                    <th className='col-3'>Remove</th>
                </tr>
            </thead>
            <tbody>
                {ourservices.map((item, index) => (
                    <tr key={index} id='item' className='mb-5'>
                        <td className='col-3'>{item.title}</td>
                        <td className='col-3'>
                            <img src={item.image} alt={item.title} style={{ width: '100px', height: '100px' }} />
                        </td>
                        <td className='col-3'>{item.price}</td>
                        <td className='col-3'>
                            <button onClick={() => handleDelete(index)} className='btn btn-danger' id='link' >Cancel</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        <div id="buttons">
            <button className='btn btn-warning m-3' onClick={handleOrder}>Place Order</button>
            <button className='btn btn-warning m-3'>Close</button>
        </div>
        </div>
    </div>
  )
}

export default Card