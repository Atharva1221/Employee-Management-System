import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './Login';
import Register from './Register';
import EmployeeList from './EmployeeList';
import CreateEmployee from './CreateEmployee';

import api from './api/axiosConfig';

import './App.css';

const App = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [adminData, setAdminData] = useState(null);
    const [showSignup, setShowSignup] = useState(false);

    const handleLogout = async () => {

        try {
            await api.post('/api/admin/logout');
        } catch (error) {
            console.error('Logout error:', error);
        }

        setIsLoggedIn(false);
        setAdminData(null);
        setShowSignup(false);
    };

    const handleSignupClick = () => {
        setShowSignup(true);
    };

    const handleLoginClick = () => {
        setShowSignup(false);
    };

    if (!isLoggedIn) {

        return showSignup ? (
            <Register
                setIsLoggedIn={setIsLoggedIn}
                setAdminData={setAdminData}
                onLoginClick={handleLoginClick}
            />
        ) : (
            <Login
                setIsLoggedIn={setIsLoggedIn}
                setAdminData={setAdminData}
                onSignupClick={handleSignupClick}
            />
        );
    }

    return (
        <Router>

            <div className="App">

                <nav className="navbar">

                    <div className="nav-container">

                        <Link
                            to="/"
                            className="nav-logo"
                        >
                            📊 Employee Management System
                        </Link>

                        <ul className="nav">

                            <li className="nav-item">

                                <Link
                                    className="nav-link"
                                    to="/get"
                                >
                                    👥 Employee List
                                </Link>

                            </li>

                            <li className="nav-item">

                                <Link
                                    className="nav-link"
                                    to="/create"
                                >
                                    ➕ Create Employee
                                </Link>

                            </li>

                            <li className="nav-item">

                                <span className="admin-info">

                                    {adminData?.username && (
                                        <>
                                            👤 {adminData.username}

                                            <button
                                                className="logout-btn"
                                                onClick={handleLogout}
                                            >
                                                Logout
                                            </button>
                                        </>
                                    )}

                                </span>

                            </li>

                        </ul>

                    </div>

                </nav>

                <Routes>

                    <Route
                        path="/get"
                        element={<EmployeeList />}
                    />

                    <Route
                        path="/create"
                        element={<CreateEmployee />}
                    />

                    <Route
                        path="/"
                        element={<EmployeeList />}
                    />

                </Routes>

            </div>

        </Router>
    );
};

export default App;