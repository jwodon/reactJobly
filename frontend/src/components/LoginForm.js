// LoginForm.js

import React, { useState } from 'react';
import JoblyApi from '../api';

const LoginForm = ({ handleLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await JoblyApi.login(username, password);
            handleLogin();
        } catch (err) {
            console.error('Login Error:', err);
            // Handle login error (display error message, reset form, etc.)
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;
