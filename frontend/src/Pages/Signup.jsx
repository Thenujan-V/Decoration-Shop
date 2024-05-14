import React, { useState } from 'react';
import '../Components/Styles';
import Navbar from '../Components/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import Signin from './Signin';
import { userSignup } from '../Services/UserService';

const Signup = () => {
    const navigate = useNavigate()
    // State variables for form data and errors
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        address: '',
        contact_no: '',
        mail_id: '',
        user_name: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateForm = () => {
        const newErrors = {};

        // Validate full name
        if (!formData.first_name) {
            newErrors.first_name = 'Full name is required.';
        }
        if (!formData.last_name) {
            newErrors.last_name = 'last name is required.';
        }

        // Validate address
        if (!formData.address) {
            newErrors.address = 'Address is required.';
        }

        // Validate contact number
        if (!formData.contact_no || !/^\d{10}$/.test(formData.contact_no)) {
            newErrors.contact_no = 'Contact number must be 10 digits.';
        }

        // Validate mail_id
        if (!formData.mail_id || !/\S+@\S+\.\S+/.test(formData.mail_id)) {
            newErrors.mail_id = 'Invalid mail_id address.';
        }

        // Validate user_name
        if (!formData.user_name) {
            newErrors.user_name = 'user_name is required.';
        }

        // Validate password
        if (!formData.password) {
            newErrors.password = 'Password is required.';
        }

        // Validate confirm password
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handler function for form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (validateForm()) {
            // setFormData({
            //     first_name: '',
            //     address: '',
            //     contact_no: '',
            //     mail_id: '',
            //     user_name: '',
            //     password: '',
            //     confirmPassword: '',
            // });
            setErrors({});
            try{
                const response  = await userSignup(formData)
                if(response === 201){
                    alert('you are registerd successfully')
                    navigate('/signin')
                }
                else{
                    alert('wrong datas please try again...!')
                }
            }   
            catch(error){
                console.log('error occure : ',error)
            }
        }
    };

    return (
        <>
        <Navbar />
        <div className="form">
            <div className=''>
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-12">
                    {/* <div className="container"> */}
                <h1>Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    {/* Full Name */}
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            id="first_name"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleInputChange}
                            placeholder='First Name'
                        />
                        {errors.first_name && <span className="text-danger">{errors.first_name}</span>}
                    </div>

                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            id="last_name"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleInputChange}
                            placeholder='Last Name'
                        />
                        {errors.last_name && <span className="text-danger">{errors.last_name}</span>}
                    </div>

                    {/* Address */}
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            placeholder='Address'

                        />
                        {errors.address && <span className="text-danger">{errors.address}</span>}
                    </div>

                    {/* Contact Number */}
                    <div className="form-group">
                        <input
                            type="tel"
                            className="form-control"
                            id="contact_no"
                            name="contact_no"
                            value={formData.contact_no}
                            onChange={handleInputChange}
                            placeholder='Contact No'

                        />
                        {errors.contact_no && <span className="text-danger">{errors.contact_no}</span>}
                    </div>

                    {/* mail_id */}
                    <div className="form-group">
                        <input
                            type="mail_id"
                            className="form-control"
                            id="mail_id"
                            name="mail_id"
                            value={formData.mail_id}
                            onChange={handleInputChange}
                            placeholder='email'

                        />
                        {errors.mail_id && <span className="text-danger">{errors.mail_id}</span>}
                    </div>

                    {/* user_name */}
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            id="user_name"
                            name="user_name"
                            value={formData.user_name}
                            onChange={handleInputChange}
                            placeholder='user_name'

                        />
                        {errors.user_name && <span className="text-danger">{errors.user_name}</span>}
                    </div>

                    {/* Password */}
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder='Password'

                        />
                        {errors.password && <span className="text-danger">{errors.password}</span>}
                    </div>

                    {/* Confirm Password */}
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            placeholder='Confirm Password'

                        />
                        {errors.confirmPassword && <span className="text-danger">{errors.confirmPassword}</span>}
                    </div>

                    {/* Submit Button */}   
                    <div className="button">
                        <button type="submit" className="btn ">Sign Up</button>
                    </div>
                </form>
                    </div>
                    <div className="col-lg-6 col-md-6 col-12" id='img'>
                        <Link to='/signin' className='link'>Alredy have an account? Click Here</Link>
                    </div>

                </div>
            </div>
        </div>
        </>
    );
};

export default Signup;

