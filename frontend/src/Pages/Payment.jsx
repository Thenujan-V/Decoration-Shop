import React, { useEffect, useState } from 'react'
import {visa, master} from '../Components/Assets'
import { payment, method } from '../Components/Styles';
import Navbar from '../Components/Navbar';
import { useNavigate } from 'react-router-dom';
import { retrieveToken } from '../Services/JwtToken';
import { viewCartItems } from '../Services/CardServices';
import { getLeastOrder, getOrders, updatePaymentStatus } from '../Services/OrderService';
import { addPayment } from '../Services/PaymentsService';


const Payment = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [cardType, setCardType] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const [orderId, setOrderId] = useState('')
    const [paymentStatus, setPaymentStatus] = useState('')

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
    const [paymentRes, setPaymentRes] = useState('')

    const totalOrderAmount = orderRes && orderRes.reduce((acc, item) => {
        if (item.order_id === orderId.order_id) {
            return (acc + parseInt(item.price) * item.quantity);
        }
        return acc
    }, 0)

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

    const determineCardType = (number) => {
        const visaRegex = /^4/;
        const mastercardRegex = /^5[1-5]/;
        if (visaRegex.test(number)) {
            return 'Visa';
        } else if (mastercardRegex.test(number)) {
            return 'Mastercard';
        }
        return '';
    };

    const validateForm = () => {
        const errors = {};
        if (!cardNumber) {
            errors.cardNumber = 'Card number is required';
        } else if (!/^\d{16}$/.test(cardNumber)) {
            errors.cardNumber = 'Card number must be 16 digits';
        }
        if (!expirationDate) {
            errors.expirationDate = 'Expiration date is required';
        } else if (!/^(0[1-9]|1[0-2])\/(\d{2})$/.test(expirationDate)) {
            errors.expirationDate = 'Invalid expiration date (MM/YY)';
        }
        if (!cvv) {
            errors.cvv = 'CVV is required';
        } else if (!/^\d{3}$/.test(cvv)) {
            errors.cvv = 'CVV must be 3 digits';
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e, paidAmount, order_id) => {
        e.preventDefault();
        if (validateForm()) {
            try{
                const paymentData = {
                    paid_amount : paidAmount,
                    order_id : order_id,
                    payment_status : 'completed'
                }
                const response = await addPayment(paymentData)
                setPaymentRes(response.data)

                const statusRes = await updatePaymentStatus(paymentData)
                setPaymentStatus(statusRes.data)
                navigater('/')

            }
            catch(error){
                console.log('error occur : ', error)
            }
        }
    };

    const handleCardNumberChange = (e) => {
        const value = e.target.value;
        setCardNumber(value);
        setCardType(determineCardType(value));
    };

  return (
    <div id='paymentPage'>
        <Navbar />
        <div className="container" >
            <div className="row">
                <div className="col-lg-4" id='payment'>
                    <h1>
                        Payment Details
                    </h1>
                    <form onSubmit={(e) => handleSubmit(e, totalOrderAmount, orderId.order_id)}>
                        <div className="form-group">
                            <label>Card Number</label>
                            <input
                                type="text"
                                className={`form-control ${formErrors.cardNumber ? 'is-invalid' : ''}`}
                                value={cardNumber}
                                onChange={handleCardNumberChange}
                                placeholder="1234 5678 9012 3456"
                            />
                            <div className="card-logo">
                                {cardType === 'Visa' && <img src={visa} alt="Visa" />}
                                {cardType === 'Mastercard' && <img src={master} alt="Mastercard" />}
                            </div>
                            {formErrors.cardNumber && <div className="invalid-feedback">{formErrors.cardNumber}</div>}
                        </div>

                        <div className="form-group">
                            <label>Expiration Date (MM/YY)</label>
                            <input
                                type="text"
                                className={`form-control ${formErrors.expirationDate ? 'is-invalid' : ''}`}
                                value={expirationDate}
                                onChange={(e) => setExpirationDate(e.target.value)}
                                placeholder="MM/YY"
                            />
                            {formErrors.expirationDate && <div className="invalid-feedback">{formErrors.expirationDate}</div>}
                        </div>

                        <div className="form-group">
                            <label>CVV</label>
                            <input
                                type="text"
                                className={`form-control ${formErrors.cvv ? 'is-invalid' : ''}`}
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value)}
                                placeholder="123"
                            />
                            {formErrors.cvv && <div className="invalid-feedback">{formErrors.cvv}</div>}
                        </div>

                        <button type="submit" className="btn btn-primary">Pay {totalOrderAmount} LKR</button>
                </form>
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

export default Payment