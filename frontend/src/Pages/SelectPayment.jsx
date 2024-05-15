import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import { viewCartItems } from '../Services/CardServices'
import { retrieveToken } from '../Services/JwtToken'

const SelectPayment = () => {
    const navigater = useNavigate()
    const decodedToken = retrieveToken()
    const user_id = decodedToken.id

    const [cardRes, setCardRes] = useState('')
    const [totalAmount, setTotalAmount] = useState(0)
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
  return (
    <div className='paymentMethod'>
        <Navbar />
        <div className="container">
            <div className="row">
                <div className="col-lg-6 method">
                    <h2>SELECT PAYMENT METHOD</h2>
                    <div>
                        <Link to='/payment' className='link'>Online Payment</Link>
                        <Link to='/' className='link'>Cash Payment (On Hand)</Link>
                    </div>
                </div>
                <div className="col-lg-6 totalAmount">
                    <h1>Your Card Items Prices</h1>
                    {cardRes && cardRes.length !== 0 ? cardRes.map((item, index) => (
                            <div className='Amount'>                        
                                <h5>{item.service_name} : <span> {item.price} LKR</span></h5>
                            </div>
                        )) : <p>    </p>
                    }     
                    <h2>Total Amount : {cardRes && cardRes.reduce((acc, item) => acc + parseInt(item.price), 0)} LKR</h2>
                    <hr />
                </div>
            </div>
        </div>
    </div>
  )
}

export default SelectPayment