import React, { useEffect, useState } from 'react';
import api from './api/axiosConfig';
import UpdateEmployee from './UpdateEmployee'; // Import the modal component
import './EmployeeList.css';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false); // State to control modal visibility
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null); // State for selected employee ID

    // Fetch employees from API
    const fetchEmployees = async () => {
        setLoading(true);
        try {
            const response = await api.get('/api/employees')
            setEmployees(response.data);
        } catch (err) {
            setError("Error fetching employee data");
        } finally {
            setLoading(false);
        }
    };

    // Update employee logic
    const updateEmployee = (employeeId) => {
        setSelectedEmployeeId(employeeId); // Set the selected employee ID
        setShowModal(true); // Show the modal
    };

    // Delete employee logic
    const deleteEmployee = async (employeeId) => {
        const confirmed = window.confirm("Are you sure you want to delete this employee?");
        if (confirmed) {
            try {
                await api.delete(`/api/employees/${employeeId}`);
                alert("Employee deleted successfully");
                fetchEmployees(); // Refresh the employee list after deletion
            } catch (error) {
                console.error("Error deleting employee:", error);
                alert("Failed to delete employee");
            }
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleModalClose = () => {
        setShowModal(false); // Close the modal
        setSelectedEmployeeId(null); // Clear the selected employee ID
    };

    if (loading) return (
        <div className='employee-list-container'>
            <div className='loading-spinner'>
                <div className='spinner'></div>
                <p>Loading employees...</p>
            </div>
        </div>
    );
    
    if (error) return (
        <div className='employee-list-container'>
            <div className='error-message'>
                <p>{error}</p>
            </div>
        </div>
    );

    return (
        <div className='employee-list-container'>
            <div className='list-wrapper'>
                <div className='list-header'>
                    <div className='header-content'>
                        <h1 className='list-title'>Employee Directory</h1>
                        <p className='list-subtitle'>Manage all employees in the system</p>
                    </div>
                    <button className='refresh-btn' onClick={fetchEmployees}>
                        <span className='refresh-icon'>⟳</span> Refresh
                    </button>
                </div>

                {employees.length === 0 ? (
                    <div className='empty-state'>
                        <div className='empty-icon'>👥</div>
                        <h2>No Employees Found</h2>
                        <p>Start by creating your first employee</p>
                    </div>
                ) : (
                    <div className='employees-table'>
                        <table className='employee-table'>
                            <thead>
                                <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th>Department</th>
                                    <th>Salary</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.map((employee) => (
                                    <tr key={employee.id} className={`status-${employee.status}`}>
                                        <td>{employee.firstName}</td>
                                        <td>{employee.lastName}</td>
                                        <td>{employee.email}</td>
                                        <td>{employee.department || 'N/A'}</td>
                                        <td>
                                            {employee.salary != null ? employee.salary.toLocaleString('en-IN', {
                                                style: 'currency',
                                                currency: 'INR',
                                                maximumFractionDigits: 0
                                                })
                                            : 'N/A'}
                                        </td>
                                        <td>
                                            <span className={`status-badge ${employee.status}`}>
                                                {employee.status || 'Active'}
                                            </span>
                                        </td>
                                        <td className='action-buttons'>
                                            <button
                                                className="btn-update"
                                                onClick={() => updateEmployee(employee.id)}
                                                title="Edit employee"
                                            >
                                                ✏️
                                            </button>
                                            <button
                                                className="btn-delete"
                                                onClick={() => deleteEmployee(employee.id)}
                                                title="Delete employee"
                                            >
                                                🗑️
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Render the UpdateEmployee modal */}
                {showModal && (
                    <UpdateEmployee
                        employeeId={selectedEmployeeId} // Pass the selected employee ID
                        onClose={handleModalClose} // Handle modal close
                        onUpdate={fetchEmployees} // Refresh the employee list after update
                    />
                )}
            </div>
        </div>
    );
};

export default EmployeeList;