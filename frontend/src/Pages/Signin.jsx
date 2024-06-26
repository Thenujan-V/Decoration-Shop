import React, { useContext, useState } from 'react'
import Navbar from '../Components/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { signin } from '../Components/Styles';
import { userSignin } from '../Services/UserService';
import { retrieveToken } from '../Services/JwtToken';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Signin = () => {
    const navigate = useNavigate()
    const [mail_id, setmail_id] = useState('');
    const [password, setPassword] = useState('');

    const [mail_idError, setmail_idError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setmail_idError('');
        setPasswordError('');

        let isValid = true;
        if (mail_id === '') {
            setmail_idError('mail_id is required');
            isValid = false;
        }
        if (password === '') {
            setPasswordError('Password is required');
            isValid = false;
        }

        if (isValid) {
            
            try{
                const formData = {
                    mail_id : mail_id,
                    password : password
                } 
                const response  = await userSignin(formData)
                
                if(response.status === 200){
                    toast.success('you are login successfully', {
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                      })
                    const token = response.data.jwtToken
                    localStorage.setItem('token' , token)
                    const decodedToken = retrieveToken()
                    if(decodedToken.role === 'user'){
                        navigate('/')
                    }
                    else if(decodedToken.role === 'admin'){
                        navigate('/admindashboard')
                    }
                    else if(decodedToken.role === 'employee'){
                        navigate('/empdashboard')
                    }
                }
                else{
                    toast.error('wrong datas please try again...!', {
                        autoClose: 5000, 
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                      })
                }
            }
            catch(error){
                console.log('error occur : ',error)
                if(error.response.status === 401 || error.response.status === 404){
                    toast.error('wrong datas please try again...!', {
                        autoClose: 5000, 
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                      })
                }
            }
        }
    }
  return (
    <>
        <Navbar />

    <div id='signinComp'>
        <form onSubmit={handleSubmit} id='signinForm'>
            <h1>sign in</h1>
                <div className="form-group">
                <label htmlFor="mail_id">Email:</label>
                <input
                    type="text"
                    id="mail_id"
                    value={mail_id}
                    onChange={(e) => setmail_id(e.target.value)}
                    className={mail_id.Error ? 'error' : ''}
                />
                <p className='p-0 m-0'>{mail_id.Error && <span className="error-message">{mail_id.Error}</span>}</p>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={password.Error ? 'error' : ''}
                />
                <p className='p-0 m-0'>{password.Error && <span className="error-message">{password.Error}</span>}</p>
            </div>
            <div className="forgot-password d-flex" style={{gap:'7vw'}}>
                <Link className='link' to="/signup">Register?</Link>
                <Link className='link' to="/forgot-password">Forgot Password?</Link>
            </div>
            <button className='btn signin mt-4' type="submit">Sign In</button>
        </form>
    </div>

    </>
    
  )
}


export default Signin