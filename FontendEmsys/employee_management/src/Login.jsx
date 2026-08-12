import React, { useState } from 'react';
import './Login.css';
import api from './api/axiosConfig';

function Login({ setIsLoggedIn, setAdminData, onSignupClick }) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {

        e.preventDefault();

        setLoading(true);
        setError('');

        try {

            const response = await api.post(
                '/api/admin/login',
                {
                    username,
                    password
                }
            );

            // Spring Security session is now stored
            // automatically by the browser.

            setAdminData({
                username: username
            });

            setIsLoggedIn(true);

        } catch (err) {

            console.error('Login error:', err);

            setError(
                err.response?.data ||
                'Invalid username or password'
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="login-container">

            <div className="login-box">

                <h2>Admin Login</h2>

                <p className="login-subtitle">
                    Employee Management System
                </p>

                <form onSubmit={handleLogin}>

                    <div className="form-group">

                        <label>
                            Username:
                        </label>

                        <input
                            type="text"
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                                setError('');
                            }}
                            placeholder="Enter your username"
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>
                            Password:
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setError('');
                            }}
                            placeholder="Enter your password"
                            required
                        />

                    </div>

                    {error && (
                        <p className="error">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="btn btn-primary login-btn"
                        disabled={loading}
                    >
                        {loading
                            ? 'Logging in...'
                            : 'Login'
                        }
                    </button>

                </form>

                <div className="signup-link">

                    Don't have an account?{' '}

                    <button
                        type="button"
                        className="link-btn"
                        onClick={onSignupClick}
                    >
                        Sign up here
                    </button>

                </div>

            </div>

        </div>
    );
}

export default Login;