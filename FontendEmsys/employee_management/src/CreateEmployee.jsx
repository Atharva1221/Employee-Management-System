import React, { useState } from 'react'
import axios from 'axios'
import './CreateEmployee.css'

const CreateEmployee = () => {
    // state to hold form input values
    const[employee , setEmployee] = useState({
        firstName : '',
        lastName : '',
        email :'',
        department: '',
        salary: '',
        status: 'Active'
    });
    

    const[message, setMessage] = useState('');
    const[messageType, setMessageType] = useState('');

    const handleInputChanges = (e) => {
        const { name, value} = e.target;
        setEmployee({
            ...employee,
            [name] : value
        });
    };
    
    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const token = localStorage.getItem('token');

        await axios.post(
            '/api/employees',
            employee,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        setMessageType('success');
        setMessage('Employee Created Successfully!');

        setEmployee({
            firstName: '',
            lastName: '',
            email: '',
            department: '',
            salary: '',
            status: 'Active'
        });

        setTimeout(() => setMessage(''), 3000);

    } catch (error) {
        setMessageType('error');
        setMessage('Error creating employee..');
        setTimeout(() => setMessage(''), 3000);
    }
};

    return (
        <div className="create-employee-container">
            <div className="form-wrapper">
                <h1 className="form-title">Create New Employee</h1>
                <p className="form-subtitle">Add a new employee to the system</p>
                
                <form onSubmit={handleSubmit} className="employee-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="firstName" className="form-label">First Name</label>
                            <input 
                                type='text' 
                                id='firstName'
                                name='firstName' 
                                value={employee.firstName} 
                                onChange={handleInputChanges}
                                placeholder="Enter first name"
                                className="form-input"
                                required 
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="lastName" className="form-label">Last Name</label>
                            <input 
                                type='text' 
                                id='lastName'
                                name='lastName' 
                                value={employee.lastName} 
                                onChange={handleInputChanges}
                                placeholder="Enter last name"
                                className="form-input"
                                required 
                            />
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input 
                            type='email' 
                            id='email'
                            name='email' 
                            value={employee.email} 
                            onChange={handleInputChanges}
                            placeholder="Enter email address"
                            className="form-input"
                            required 
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="department" className="form-label">Department</label>
                            <input 
                                type='text' 
                                id='department'
                                name='department' 
                                value={employee.department} 
                                onChange={handleInputChanges}
                                placeholder="e.g., HR, IT, Sales"
                                className="form-input"
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="salary" className="form-label">Salary</label>
                            <input 
                                type='number' 
                                id='salary'
                                name='salary' 
                                value={employee.salary} 
                                onChange={handleInputChanges}
                                placeholder="Enter salary"
                                className="form-input"
                                step="0.01"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="status" className="form-label">Status</label>
                        <select 
                            id='status'
                            name='status' 
                            value={employee.status} 
                            onChange={handleInputChanges}
                            className="form-input"
                        >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>

                    <button type='submit' className="submit-btn">Create Employee</button>
                </form>

                {message && (
                    <div className={`message ${messageType}`}>
                        {message}
                    </div>
                )}
            </div>
        </div>
    )

}

export default CreateEmployee