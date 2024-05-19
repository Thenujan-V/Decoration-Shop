import React, { useEffect, useState } from 'react';
import { contact } from '../Components/Styles';
import Navbar from '../Components/Navbar';
import { useNavigate } from 'react-router-dom';
import { retrieveToken } from '../Services/JwtToken';
import {addQuestions} from '../Services/UserService'

const Contact = () => {
  const navigater = useNavigate()
  const decodedToken = retrieveToken()
  const [user_Id, setUser_Id] = useState('')

  useEffect(() => {
      if(decodedToken){
          const id = decodedToken.id
          setUser_Id(id)
      }
      else{
          navigater('/signin')
      }
  }, [])

  const [user_name, setuser_name] = useState('');
  const [mail_id, setmail_id] = useState('');
  const [message, setMessage] = useState('');
  const [apiResponse, setApiResponse] = useState('')

  const handleSubmit = async(e) => {
    e.preventDefault();
    const formData = {
      user_name,
      mail_id,
      message,
      user_Id
    };

    try{
      const response = await addQuestions(formData)
      console.log('resss :', response.data)
      setApiResponse(response.data)

    }
    catch(error){
      console.log(error.response)
    }
  }
  return (
    <div className='contact'>
      <Navbar />
      <div className="contact-container">
        <div className="contact-row">
          <div className="contact-details">
            <h2 className="contact-title">Contact Details</h2>
            <p><strong>Email:</strong> info@saradecorations.com</p>
            <p><strong>Phone:</strong> +94 456 7890</p>
            <p><strong>Address:</strong> 123 Flower Street, Blossom City, FL 12345</p>
          </div>
          <div className="contact-form">
            <h2 className="contact-title">Contact Us</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="formName">Name</label>
                <input
                  type="text"
                  id="formName"
                  className="form-control"
                  placeholder="Enter your name"
                  value={user_name}
                  onChange={(e) => setuser_name(e.target.value)}
                  required
              />
              </div>
              <div className="form-group">
                <label htmlFor="formEmail">Email address</label>
                <input
                  type="email"
                  id="formEmail"
                  className="form-control"
                  placeholder="Enter your email"
                  value={mail_id}
                  onChange={(e) => setmail_id(e.target.value)}
                  required
              />              </div>
              <div className="form-group">
                <label htmlFor="formMessage">Message</label>
                <textarea
                  id="formMessage"
                  className="form-control"
                  rows="5"
                  placeholder="Your message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                ></textarea>              
              </div>
              <button type="submit" className="btn-submit">Submit</button>
            </form>
          </div>
        </div>  
      </div>  
    </div>
    
  );
}

export default Contact;
