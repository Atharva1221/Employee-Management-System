import React, { useState, useEffect } from 'react';
import api from './api/axiosConfig';
import './UpdateEmployee.css';

const UpdateEmployee = ({ employeeId, onClose, onUpdate }) => {
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                setLoading(true);
                setError('');

                const response = await api.get(`/api/employees/${employeeId}`);
                setEmployee(response.data);
            } catch (err) {
                console.error('Error fetching employee:', err);
                setError('Error fetching employee data');
            } finally {
                setLoading(false);
            }
        };

        if (employeeId) {
            fetchEmployee();
        }
    }, [employeeId]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setEmployee((prev) => ({
            ...prev,
            [name]: name === 'salary'
                ? (value === '' ? null : Number(value))
                : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setError('');

            await api.put(`/api/employees/${employeeId}`, {
                firstName: employee.firstName,
                lastName: employee.lastName,
                email: employee.email,
                department: employee.department,
                salary: employee.salary,
                status: employee.status
            });

            onUpdate();
            onClose();

        } catch (err) {
            console.error('Error updating employee:', err);
            setError(
                err.response?.data?.message ||
                'Failed to update employee'
            );
        }
    };

    if (loading) {
        return (
            <div className="modal-overlay">
                <div className="modal-box loading-state">
                    <div className="spinner"></div>
                    <p>Loading employee data...</p>
                </div>
            </div>
        );
    }

    if (error && !employee) {
        return (
            <div className="modal-overlay" onClick={onClose}>
                <div
                    className="modal-box error-state"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="modal-header">
                        <h2 className="modal-title">Error</h2>

                        <button
                            type="button"
                            className="close-btn"
                            onClick={onClose}
                            aria-label="Close"
                        >
                            ✕
                        </button>
                    </div>

                    <div className="modal-body">
                        <p className="error-text">{error}</p>
                    </div>

                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn-cancel"
                            onClick={onClose}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (!employee) {
        return null;
    }

    return (
        <div className="modal-overlay" onClick={onClose}>

            <div
                className="modal-box"
                onClick={(e) => e.stopPropagation()}
            >

                <div className="modal-header">
                    <h2 className="modal-title">
                        Update Employee Information
                    </h2>

                    <button
                        type="button"
                        className="close-btn"
                        onClick={onClose}
                        aria-label="Close"
                    >
                        ✕
                    </button>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="update-form"
                >

                    <div className="modal-body">

                        <div className="form-group">
                            <label
                                htmlFor="firstName"
                                className="form-label"
                            >
                                First Name
                            </label>

                            <input
                                type="text"
                                id="firstName"
                                className="form-input"
                                name="firstName"
                                value={employee.firstName || ''}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label
                                htmlFor="lastName"
                                className="form-label"
                            >
                                Last Name
                            </label>

                            <input
                                type="text"
                                id="lastName"
                                className="form-input"
                                name="lastName"
                                value={employee.lastName || ''}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label
                                htmlFor="email"
                                className="form-label"
                            >
                                Email
                            </label>

                            <input
                                type="email"
                                id="email"
                                className="form-input"
                                name="email"
                                value={employee.email || ''}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label
                                htmlFor="department"
                                className="form-label"
                            >
                                Department
                            </label>

                            <input
                                type="text"
                                id="department"
                                className="form-input"
                                name="department"
                                value={employee.department || ''}
                                onChange={handleChange}
                                placeholder="Enter department"
                            />
                        </div>

                        <div className="form-group">
                            <label
                                htmlFor="salary"
                                className="form-label"
                            >
                                Salary
                            </label>

                            <input
                                type="number"
                                id="salary"
                                className="form-input"
                                name="salary"
                                value={employee.salary ?? ''}
                                onChange={handleChange}
                                placeholder="Enter salary"
                                min="0"
                            />
                        </div>

                        <div className="form-group">
                            <label
                                htmlFor="status"
                                className="form-label"
                            >
                                Status
                            </label>

                            <select
                                id="status"
                                className="form-input"
                                name="status"
                                value={employee.status || 'ACTIVE'}
                                onChange={handleChange}
                            >
                                <option value="ACTIVE">
                                    ACTIVE
                                </option>

                                <option value="INACTIVE">
                                    INACTIVE
                                </option>
                            </select>
                        </div>

                        {error && (
                            <p className="error-text">
                                {error}
                            </p>
                        )}

                    </div>

                    <div className="modal-footer">

                        <button
                            type="button"
                            className="btn-cancel"
                            onClick={onClose}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="btn-submit"
                        >
                            Update Employee
                        </button>

                    </div>

                </form>
            </div>

        </div>
    );
};

export default UpdateEmployee;