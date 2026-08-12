import React, { useState } from 'react';
import './Register.css';
import api from './api/axiosConfig';

function Register({ setIsLoggedIn, setAdminData, onLoginClick }) {

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

        setError('');
    };

    const validateForm = () => {

        if (
            !formData.username ||
            !formData.email ||
            !formData.password ||
            !formData.confirmPassword
        ) {
            setError('All fields are required');
            return false;
        }

        if (formData.username.length < 3) {
            setError('Username must be at least 3 characters');
            return false;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            setError('Please enter a valid email');
            return false;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return false;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return false;
        }

        return true;
    };

    const handleRegister = async (e) => {

        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');

        try {

            await api.post('/api/admin/register', {
                username: formData.username,
                email: formData.email,
                password: formData.password
            });

            setSuccess(
                'Registration successful! Redirecting to login...'
            );

            setTimeout(() => {
                onLoginClick();
            }, 2000);

        } catch (err) {

            console.error('Registration error:', err);

            setError(
                err.response?.data?.message ||
                err.response?.data ||
                'Registration failed. Username may already exist.'
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="register-container">

            <div className="register-box">

                <h2>Create Admin Account</h2>

                <p className="register-subtitle">
                    Register for Employee Management System
                </p>

                <form onSubmit={handleRegister}>

                    <div className="form-group">

                        <label>Username:</label>

                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Choose a username"
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>Email:</label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>Password:</label>

                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter password (min 6 characters)"
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>Confirm Password:</label>

                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm your password"
                            required
                        />

                    </div>

                    {error && (
                        <p className="error">
                            {error}
                        </p>
                    )}

                    {success && (
                        <p className="success">
                            {success}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="btn btn-primary register-btn"
                        disabled={loading}
                    >
                        {loading
                            ? 'Creating Account...'
                            : 'Register'
                        }
                    </button>

                </form>

                <div className="login-link">

                    Already have an account?{' '}

                    <button
                        type="button"
                        className="link-btn"
                        onClick={onLoginClick}
                    >
                        Login here
                    </button>

                </div>

            </div>

        </div>
    );
}

export default Register;