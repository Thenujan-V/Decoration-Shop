import React, { useEffect, useState } from 'react';
import { unauthorized } from './Styles';
import { Link, useNavigate } from 'react-router-dom';
import { retrieveToken } from '../Services/JwtToken';

const Unauthorized = () => {
  const navigate = useNavigate()
  const decoded = retrieveToken()

  const [userRole, setUserRole] = useState()
  
  useEffect(() => {
    if(decoded){
      const userRole = decoded.role
        setUserRole(userRole)
    }
  }, [decoded])

  const getPath = () => {
    switch (userRole) {
      case 'admin':
        return '/admindashboard';
      case 'employee':
        return '/empdashboard';
      case 'user':
        return '/';
      default:
        return '/';
    }
  }

  return (
    <div className="container unauthorized">
      <img src="/path/to/logo.png" alt="Company Logo" className="logo" />
      <h1>Access Denied</h1>
      <p>You do not have permission to view this page.</p>
      <p>If you believe this is an error, please <a href="/contact">contact support</a>.</p>
      <p><Link to={getPath()} >Return to Homepage</Link></p>
    </div>
  );
};

export default Unauthorized;
