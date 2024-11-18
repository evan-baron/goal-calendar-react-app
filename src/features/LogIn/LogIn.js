import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import './Login.css';
import { login } from './loginSlice';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username.length === 0 || password.length === 0) {
            return;
        }

        const userLoggedIn = {
            id: uuidv4(),
            username: username
        }

        dispatch(login(userLoggedIn));
        navigate('/dashboard');
    };

    return (
        <div className='login'>
            <div className='login-title'>Login to <span className='login-logo'>marbl'r</span></div>
            <form className='login-form' onSubmit={handleSubmit}>
                <div className='credentials'>
                    <div className='username'>
                        <label htmlFor='username'>Username:</label>
                        <input 
                            type='text' 
                            id='username' 
                            name='username' 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)}
                            required 
                        />
                    </div>

                    <div className='password'>
                        <label htmlFor='password'>Password:</label>
                        <input 
                            type='password' 
                            id='password' 
                            name='password' 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                        />
                    </div>

                    <div className='remember-me'>
                        <div>
                            <input 
                                type='checkbox' 
                                id='rememberMe' 
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            <label htmlFor='rememberMe'>Remember Me</label>
                        </div>
                        <Link to="/forgotpassword">
                            <div className='forgot-pass'>Forgot Password?</div>
                        </Link>
                    </div>
                </div>

                <button className='login-button' type='submit'>Log In</button>
                <div>Don't have an account? <Link to="/signup">SIGN UP.</Link></div>
            </form>
        </div>
    )
}

export default Login