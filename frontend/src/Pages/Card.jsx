import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import { Link } from 'react-router-dom'
import { card } from '../Components/Styles'
import { useNavigate } from 'react-router-dom'
import { deleteCardItem, updateQuantity, viewCartItems } from '../Services/CardServices'
import { retrieveToken } from '../Services/JwtToken'
import { aboutback } from '../Components/Assets'
import axios from 'axios'
import { addToOrder } from '../Services/OrderService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBicycle, faTrash, faTrashCan } from '@fortawesome/free-solid-svg-icons'

const Card = () => {
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

    const [cardRes, setCardRes] = useState('')
    const [quantityRes, setQuantityRes] = useState('')
    const [orderRes, setOrderRes] = useState('')
    const [sevenDaysLater, setSevenDaysLater] = useState(null);
    const [totalAmount, setTotalAmount] = useState(0)
    const [deleteItem, setDeleteItem] = useState('')

    useEffect(() => {
      const today = new Date();
      const sevenDaysLaterDate = new Date(today);
      sevenDaysLaterDate.setDate(today.getDate() + 7);
      const formattedDate = sevenDaysLaterDate.toISOString().split('T')[0];

      setSevenDaysLater(formattedDate);
    }, []);

    useEffect( () => {
        const fetchCardItems = async (user_id) => {
            try{
                const response = await viewCartItems(user_id)
                console.log('card :', response.data)
                console.log('card :', user_id)
                setCardRes(response.data)
            }
            catch(error){
                console.log('error occur', error)
            }
        }
        fetchCardItems(user_id)
    }, [user_id])
   

    const handleQuantityChange = async (index, newQuantity) => {
        const updatedCardRes = [...cardRes];
        updatedCardRes[index].quantity = newQuantity;
        setCardRes(updatedCardRes);        
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

    const handleDelete = async(card_id) => {
        try{
            const response = await deleteCardItem(card_id)
            setDeleteItem(response.data)
            window.location.reload();

        }
        catch(error){
            console.log('cannot detele this item: ', error.response)
        }
    }

    const handleOrder = async(user_id) => {
        try{
            const formData = {
                status : 'waiting',
                deadline : sevenDaysLater,
                user_Id : user_id   
            }
            const response = await addToOrder(formData)
            setOrderRes(response)
            navigater('/selectpayment')
        }
        catch(error){
            console.log('error occur :',error)
        }
    }
    const handleClose = () => {
        navigater('/service')
    }
  return (
    <div id='card'>
        <Navbar />
        <div className="container" >
            <h1>Card</h1>
            { cardRes && cardRes.length !== 0 ?
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
                    {cardRes && cardRes.length !== 0 && cardRes.map((item, index) => (
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
                                <button onClick={() => handleDelete(item.card_id)} className='delete' id='link' >
                                <FontAwesomeIcon
                                    icon={faTrashCan}
                                    style={{ color:'red' }}
                                    size='x'
                                />
                                </button>
                            </td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>  : <p>There is no items in your card</p>
            }  

            { cardRes && cardRes.length !== 0 ?
            <div className="totalAmount">
                <h1>Your Card Items Prices</h1>
                <div className="head row">
                        <h4 className='col-lg-4'>Service_Name</h4>
                        <h4 className='col-lg-4'>Service_Qantity</h4>
                        <h4 className='col-lg-4'>Total</h4>
                    </div>
                    {cardRes && cardRes.length !== 0 ? cardRes.map((item, index) => (
                            <div className='Amount row'>                        
                                <h5 className='col-lg-4'>{item.service_name}</h5>
                                <h5 className='col-lg-4'>({item.quantity} item * {item.price})</h5>
                                <h5 className='col-lg-4'>{item.price * item.quantity} LKR</h5>
                            </div>
                        )) : <p>    </p>
                    }     
                <h2>Total Amount : {cardRes && cardRes.reduce((acc, item) => acc + parseInt(item.price * item.quantity), 0)} LKR</h2>
                <hr />
                <div id="buttons">
                    <button className='btn btn-warning m-3' onClick={() => handleOrder(user_id)}>Place Order</button>
                    <button className='btn btn-warning m-3' onClick={handleClose}>Close</button>
                </div>
            </div> : null}

        
        </div>
    </div>
  )
}

export default Card