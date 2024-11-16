import React, { useState } from 'react'
import './Login.css'

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
    };

    return (
        <div className='login'>
            <form className='login-form' onSubmit={handleLogin}>

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