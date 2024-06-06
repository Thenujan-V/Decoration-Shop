import React, { useEffect, useState } from 'react';
import '../Components/Styles';
import Navbar from '../Components/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { userSignup } from '../Services/UserService';
import { retrieveToken } from '../Services/JwtToken';
import { sign } from '../Components/Styles';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
    const navigate = useNavigate();
    const decoded = retrieveToken();

    useEffect(() => {
        if (decoded) {
            const userRole = decoded.role;
            if (userRole === 'admin' || userRole === 'employee') {
                navigate('/unauthorized');
            }
        }
    }, [decoded, navigate]);

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

        if (!formData.first_name) {
            newErrors.first_name = 'First name is required.';
        }
        if (!formData.last_name) {
            newErrors.last_name = 'Last name is required.';
        }
        if (!formData.address) {
            newErrors.address = 'Address is required.';
        }
        if (!formData.contact_no || !/^\d{10}$/.test(formData.contact_no)) {
            newErrors.contact_no = 'Contact number must be 10 digits.';
        }
        if (!formData.mail_id || !/\S+@\S+\.\S+/.test(formData.mail_id)) {
            newErrors.mail_id = 'Invalid email address.';
        }
        if (!formData.user_name) {
            newErrors.user_name = 'Username is required.';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required.';
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (validateForm()) {
            setErrors({});
            try {
                const response = await userSignup(formData);
                if (response === 201) {
                    toast.success('You are registered successfully', {
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                      });
                    navigate('/signin');
                } else {
                    toast.error('Wrong data, please try again.', {
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                      });
                }
            } catch (error) {
                toast.error('Error occurred, please try again later.', {
                     autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                console.log('Error occurred:', error);
            }
        }
        else {
            toast.error('Validation failed, please check your input.');
        }
    };

    return (
        <div className='signup'>
            <Navbar />
            <div className="form">
                <div className="form-container">
                    <h1>Sign Up</h1>
                    <form onSubmit={handleSubmit}>
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
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                id="user_name"
                                name="user_name"
                                value={formData.user_name}
                                onChange={handleInputChange}
                                placeholder='Username'
                            />
                            {errors.user_name && <span className="text-danger">{errors.user_name}</span>}
                        </div>
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
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                id="mail_id"
                                name="mail_id"
                                value={formData.mail_id}
                                onChange={handleInputChange}
                                placeholder='Email'
                            />
                            {errors.mail_id && <span className="text-danger">{errors.mail_id}</span>}
                        </div>
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
                        <div className="button">
                            <button type="submit" className="btn">Sign Up</button>
                        </div>
                    </form>
                    <Link to='/signin' className='link'>Already have an account? Click Here</Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;
