import React, { useState } from 'react';
import '../Components/Styles';
import Navbar from '../Components/Navbar';
import { Link } from 'react-router-dom';
import Signin from '../Components/Signin';

const Signup = () => {
    // State variables for form data and errors
    const [formData, setFormData] = useState({
        fullName: '',
        address: '',
        contactNo: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({});

    // Handler function for input changes
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Validation function for form data
    const validateForm = () => {
        const newErrors = {};

        // Validate full name
        if (!formData.fullName) {
            newErrors.fullName = 'Full name is required.';
        }

        // Validate address
        if (!formData.address) {
            newErrors.address = 'Address is required.';
        }

        // Validate contact number
        if (!formData.contactNo || !/^\d{10}$/.test(formData.contactNo)) {
            newErrors.contactNo = 'Contact number must be 10 digits.';
        }

        // Validate email
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Invalid email address.';
        }

        // Validate username
        if (!formData.username) {
            newErrors.username = 'Username is required.';
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
    const handleSubmit = (event) => {
        event.preventDefault();

        if (validateForm()) {
            // Form is valid, submit the form (e.g., make an API call)
            console.log('Form data:', formData);
            // Reset form after successful submission
            setFormData({
                fullName: '',
                address: '',
                contactNo: '',
                email: '',
                username: '',
                password: '',
                confirmPassword: '',
            });
            setErrors({});
        }
    };

    return (
        <>
        <Navbar />
        <div className="form">
            <div className="">
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-12">
                    {/* <div className="container"> */}
                <h1>Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    {/* Full Name */}
                    <div className="form-group">
                        <label htmlFor="fullName">Full Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                        />
                        {errors.fullName && <span className="text-danger">{errors.fullName}</span>}
                    </div>

                    {/* Address */}
                    <div className="form-group">
                        <label htmlFor="address">Address:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                        />
                        {errors.address && <span className="text-danger">{errors.address}</span>}
                    </div>

                    {/* Contact Number */}
                    <div className="form-group">
                        <label htmlFor="contactNo">Contact No:</label>
                        <input
                            type="tel"
                            className="form-control"
                            id="contactNo"
                            name="contactNo"
                            value={formData.contactNo}
                            onChange={handleInputChange}
                        />
                        {errors.contactNo && <span className="text-danger">{errors.contactNo}</span>}
                    </div>

                    {/* Email */}
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        {errors.email && <span className="text-danger">{errors.email}</span>}
                    </div>

                    {/* Username */}
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                        />
                        {errors.username && <span className="text-danger">{errors.username}</span>}
                    </div>

                    {/* Password */}
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                        {errors.password && <span className="text-danger">{errors.password}</span>}
                    </div>

                    {/* Confirm Password */}
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <input
                            type="password"
                            className="form-control"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                        />
                        {errors.confirmPassword && <span className="text-danger">{errors.confirmPassword}</span>}
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="btn ">Sign Up</button>
                </form>
                    </div>
                    <div className="col-lg-6 col-md-6 col-12" id='img'>
                        <Signin />
                    </div>

                </div>
            </div>
        </div>
        </>
    );
};

export default Signup;

