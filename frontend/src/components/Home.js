// src/components/Home.js

import React, { useContext } from 'react';
import { UserContext } from '../App'; // Import the context

function Home() {
    const { currentUser } = useContext(UserContext); // Use context to get currentUser

    return (
        <div className="container mt-5">
            <h1>Welcome back{currentUser ? `, ${currentUser.firstName}` : '!'}</h1>
            <p>This is your job application platform.</p>
        </div>
    );
}

export default Home;
