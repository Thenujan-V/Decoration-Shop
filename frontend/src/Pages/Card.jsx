import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import { Link } from 'react-router-dom'
import { card } from '../Components/Styles'
import { useNavigate } from 'react-router-dom'
import { updateQuantity, viewCartItems } from '../Services/CardServices'
import { retrieveToken } from '../Services/JwtToken'
import { aboutback } from '../Components/Assets'

const Card = () => {
    const navigater = useNavigate()
    const decodedToken = retrieveToken()
    const user_id = decodedToken.id

    const [cardRes, setCardRes] = useState('')
    const [quantityRes, setQuantityRes] = useState('')
    useEffect( () => {
        const fetchCardItems = async (user_id) => {
            try{
                const response = await viewCartItems(user_id)
                setCardRes(response.data)
            }
            catch(error){
                console.log('error occur', error)
            }
        }
        fetchCardItems(user_id)
    }, [])

    const handleQuantityChange = async (index, newQuantity) => {
        const updatedCardRes = [...cardRes];
        updatedCardRes[index].quantity = newQuantity;
        setCardRes(updatedCardRes);
        console.log('cr :',cardRes)

        
    };

    const handleSubmit = async(e, service_id, newQuantity) => {
        e.preventDefault()
        const quantity = {
            quantity:newQuantity
        }
        try{
            const response = await updateQuantity(service_id, quantity)
            setQuantityRes(response.data)
        }
        catch(error){
            console.log('error occur :', error)
        }
    }

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
                    <th className='col-2'>Price</th>
                    <th className='col-2'>Quantity</th>
                    <th className='col-2'>Remove</th>
                </tr>
            </thead>
            <tbody>
                {cardRes && cardRes.map((item, index) => (
                    <tr key={index} id='item' className='mb-5'>
                        <td className='col-3'>{item.service_name}</td>
                        <td className='col-2'>
                            <img src={aboutback} alt={item.title} style={{ width: '100px', height: '100px' }} />
                        </td>
                        <td className='col-2'>{item.price}</td>
                        <td>
                            <form onSubmit={(e) => handleSubmit(e, item.service_id, item.quantity)}>
                                <div className="form-control" >
                                    <input type="number" name='quantity' value={item.quantity} onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}/>
                                    <button type='submit' className='btn btn-warning w-50 h-25'>update</button>
                                </div>
                            </form> 
                        </td>
                        <td className='col-2'>
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