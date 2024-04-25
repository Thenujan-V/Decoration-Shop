import React, { useState } from 'react'
import { signin } from './Styles';

const Signin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        setUsernameError('');
        setPasswordError('');

        let isValid = true;
        if (username === '') {
            setUsernameError('Username is required');
            isValid = false;
        }
        if (password === '') {
            setPasswordError('Password is required');
            isValid = false;
        }

        if (isValid) {
            console.log('Form submitted:', { username, password });
            // Add your form submission logic here (e.g., API call)
        }
    }
  return (
    <div id='signinComp'>
        <h3> Already have an account? <span>sign in</span></h3>
        <form onSubmit={handleSubmit} id='signinForm'>
                <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={usernameError ? 'error' : ''}
                />
                <p className='p-0 m-0'>{usernameError && <span className="error-message">{usernameError}</span>}</p>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={passwordError ? 'error' : ''}
                />
                <p className='p-0 m-0'>{passwordError && <span className="error-message">{passwordError}</span>}</p>
            </div>
            <div className="forgot-password">
                <a href="/forgot-password">Forgot Password?</a>
            </div>
            <button className='btn signin' type="submit">Sign In</button>
        </form>
    </div>
  )
}


export default Signin