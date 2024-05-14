import React, { useState } from 'react'
import Navbar from '../Components/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { signin } from '../Components/Styles';
import { userSignin } from '../Services/UserService';

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
                if(response === 200){
                    alert('you are login successfully')
                    navigate('/')
                }
                else{
                    alert('wrong datas please try again...!')
                }
            }
            catch(error){
                console.log('error occur : ',error)
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
            <div className="forgot-password">
                <Link className='link' to="/forgot-password">Forgot Password?</Link>
            </div>
            <button className='btn signin' type="submit">Sign In</button>
        </form>
    </div>
    </>
    
  )
}


export default Signin