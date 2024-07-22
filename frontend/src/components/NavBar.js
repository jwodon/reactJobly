import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../App';

function NavBar() {
    const { currentUser, logout } = useContext(UserContext);

    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/companies">Companies</Link>
            <Link to="/jobs">Jobs</Link>
            {currentUser ? (
                <>
                    <span>{currentUser.username}</span>
                    <button onClick={logout}>Logout</button>
                    <Link to="/profile">Profile</Link>
                </>
            ) : (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Signup</Link>
                </>
            )}
        </nav>
    );
}

export default NavBar;
