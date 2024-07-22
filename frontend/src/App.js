import React, { createContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Importing jwtDecode
import './App.css';
import Home from './components/Home';
import Companies from './components/Companies';
import CompanyDetail from './components/CompanyDetail';
import Jobs from './components/Jobs';
import JobDetail from './components/JobDetail';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import NavBar from './components/NavBar';
import JoblyApi from './api';
import 'bootstrap/dist/css/bootstrap.min.css';

export const UserContext = createContext(null);

function App() {
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [currentUser, setCurrentUser] = useState(null);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        async function fetchUser() {
            if (token) {
                try {
                    const decodedToken = jwtDecode(token);
                    const { username } = decodedToken;
                    JoblyApi.token = token;
                    const user = await JoblyApi.getCurrentUser(username);
                    setCurrentUser(user);
                } catch (err) {
                    console.error('App fetchUser error', err);
                    setCurrentUser(null);
                }
            } else {
                setCurrentUser(null);
            }
        }
        fetchUser();
    }, [token]);

    const login = async (data) => {
        try {
            const token = await JoblyApi.login(data);
            setToken(token);
            localStorage.setItem('token', token);
        } catch (err) {
            console.error('Login failed', err);
        }
    };

    const signup = async (data) => {
        try {
            const token = await JoblyApi.signup(data);
            setToken(token);
            localStorage.setItem('token', token);
        } catch (err) {
            console.error('Signup failed', err);
        }
    };

    const logout = () => {
        setToken(null);
        setCurrentUser(null);
        localStorage.removeItem('token');
    };

    // Define handleSearchResults function
    const handleSearchResults = (results) => {
        setSearchResults(results);
        // Optionally, you can add more logic here
    };

    const applyToJob = async (jobId) => {
        try {
            await JoblyApi.applyToJob(jobId); // Call API to apply
            setCurrentUser(await JoblyApi.getCurrentUser(currentUser.username)); // Refresh user data
        } catch (err) {
            console.error('Error applying for job:', err);
        }
    };

    const hasAppliedToJob = (jobId) => {
        return currentUser?.applications?.includes(jobId) || false; // Check if user has applied
    };

    return (
        <UserContext.Provider value={{ currentUser, login, signup, logout, applyToJob, hasAppliedToJob }}>
            <Router>
                <div className="App">
                    <NavBar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/companies" element={<Companies handleSearchResults={handleSearchResults} />} />
                        <Route path="/jobs" element={<Jobs handleSearchResults={handleSearchResults} />} />
                        <Route path="/companies/:handle" element={<CompanyDetail />} />
                        <Route path="/jobs/:id" element={<JobDetail />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/profile" element={<Profile />} />
                    </Routes>
                </div>
            </Router>
        </UserContext.Provider>
    );
}

export default App;
