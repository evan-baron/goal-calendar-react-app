import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../app/routes';
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
        navigate(ROUTES.dashboardRoute());
    };

    return (
        <div className='login'>
            <form className='login-form' onSubmit={handleSubmit}>

                <label htmlFor="username">Username:</label>
                <input 
                    type="text" 
                    id="username" 
                    name="username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)}
                    required 
                />

                <label htmlFor="password">Password:</label>
                <input 
                    type='password' 
                    id='password' 
                    name='password' 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                />

                <div>
                    <input 
                        type='checkbox' 
                        id='rememberMe' 
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <label htmlFor='rememberMe'>Remember Me</label>
                </div>

                <button type='submit'>Log In</button>
            </form>
        </div>
    )
}

export default Login