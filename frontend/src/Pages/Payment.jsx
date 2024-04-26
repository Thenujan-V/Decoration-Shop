import React, { useState } from 'react'
import {visa, master} from '../Components/Assets'
import { payment } from '../Components/Styles';
import Navbar from '../Components/Navbar';


const Payment = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [cardType, setCardType] = useState('');
    const [formErrors, setFormErrors] = useState({});

    // Determine card type based on the card number
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

    // Validate the form inputs
    const validateForm = () => {
        const errors = {};
        // Validate card number
        if (!cardNumber) {
            errors.cardNumber = 'Card number is required';
        } else if (!/^\d{16}$/.test(cardNumber)) {
            errors.cardNumber = 'Card number must be 16 digits';
        }
        // Validate expiration date
        if (!expirationDate) {
            errors.expirationDate = 'Expiration date is required';
        } else if (!/^(0[1-9]|1[0-2])\/(\d{2})$/.test(expirationDate)) {
            errors.expirationDate = 'Invalid expiration date (MM/YY)';
        }
        // Validate CVV
        if (!cvv) {
            errors.cvv = 'CVV is required';
        } else if (!/^\d{3}$/.test(cvv)) {
            errors.cvv = 'CVV must be 3 digits';
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            // Form is valid; proceed with form submission
            console.log('Form submitted');
            // Add your form submission logic here
        }
    };

    // Handle card number change
    const handleCardNumberChange = (e) => {
        const value = e.target.value;
        setCardNumber(value);
        // Determine card type based on the inputted card number
        setCardType(determineCardType(value));
    };

  return (
    <div id='paymentPage'>
        <Navbar />
        <div className="container" >
            <div className="col-lg-6" id='payment'>
                <h1>
                    Payment Details
                </h1>
                <form onSubmit={handleSubmit}>
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

                    <button type="submit" className="btn btn-primary">Pay</button>
             </form>
            </div>
        </div>
    </div>
  )
}

export default Payment