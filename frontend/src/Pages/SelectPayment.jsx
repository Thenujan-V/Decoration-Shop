import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import { retrieveToken } from '../Services/JwtToken'
import { addPaymentMethod } from '../Services/PaymentsService'
import { getLeastOrder, getOrders, updatePaymentStatus } from '../Services/OrderService'

const SelectPayment = () => {
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
    const [orderRes, setorderRes] = useState('')
    const [totalAmount, setTotalAmount] = useState(0)
    const [paymentMethod, setPaymentMethod] = useState('')
    const [orderId, setOrderId] = useState('')
    const [paymentStatus, setPaymentStatus] = useState('')


    useEffect( () => {
        const fetchCardItems = async (user_id) => {
            try{
                const response = await getOrders(user_id)
                setorderRes(response.data)
            }
            catch(error){
                console.log('error occur', error)
            }
        }
        fetchCardItems(user_id)
    }, [user_id])

    useEffect(() => {
        const fetchOrderId = async (user_id) => {
            try{
                const response = await getLeastOrder(user_id)
                setOrderId(response.data[0])
            }
            catch(error){
                console.log('error occur :', error)
            }
        }
        fetchOrderId(user_id)
    }, [user_id])

    const totalOrderAmount = orderRes && orderRes.reduce((acc, item) => {
            if (item.order_id === orderId.order_id) {
                return (acc + parseInt(item.price) * item.quantity);
            }
            return acc
        }, 0)
    

    const handleSelectPaymentMethod = async (paymentDatas) => {
        try{
            const response = await addPaymentMethod(paymentDatas)
            setPaymentMethod(response.data)
        }
        catch(error){
            console.log('error occur :',error)
        }
        try{
            const statusRes = await updatePaymentStatus(paymentDatas)
            setPaymentStatus(statusRes.data)

            if(paymentDatas.method === 'Online'){
                navigater('/payment')
            }
            else{
                navigater('/')
            }
        }
        catch(error){
            console.log('status update error occur :',error)
        }
    }
    

  return (
    <div className='paymentMethod'>
        <Navbar />
        <div className="container">
            <div className="row">
                <div className="col-lg-4 method">
                    <h2>SELECT PAYMENT METHOD</h2>
                    <div>
                        <Link onClick={() => handleSelectPaymentMethod({total_amount : totalOrderAmount, order_id : orderId.order_id, method : 'Online', payment_status : 'payment pending'})} className='link'>Online Payment</Link>
                        <Link onClick={() => handleSelectPaymentMethod({total_amount : totalOrderAmount, order_id : orderId.order_id, method : 'OnHand', payment_status : 'payment pending'})} className='link'>Cash Payment (On Hand)</Link>
                        <Link onClick={() => handleSelectPaymentMethod({total_amount : totalOrderAmount, order_id : orderId.order_id, method : 'Cancel', payment_status : 'Cancel'})} className='link mt-5' style={{backgroundColor:'red'}}>Cancel Order</Link>
                    </div>
                </div>
                <div className="col-lg-8 totalAmount">
                    <h1>Your Orderd Items Prices</h1>
                    <div className="head row">
                        <h4 className='col-lg-4'>Service_Name</h4>
                        <h4 className='col-lg-4'>Service_Qantity</h4>
                        <h4 className='col-lg-4'>Total</h4>
                    </div>
                    {orderRes && orderRes.length !== 0 ? orderRes.map((item, index) => {
                            if (item.order_id === orderId.order_id) {
                                return (
                                    <div className='Amount row' key={index}>                        
                                        <h5 className='col-lg-4'>{item.service_name}</h5>
                                        <h5 className='col-lg-4'>({item.quantity} item * {item.price})</h5>
                                        <h5 className='col-lg-4'>{item.price * item.quantity} LKR</h5>
                                    </div>
                                );
                            } else {
                                return null;
                            }
                    }) : <p>    </p>
                    }     
                    <h2>Total Amount : {totalOrderAmount} LKR</h2>
                    <hr />
                </div>
            </div>
        </div>
    </div>
  )
}

export default SelectPayment