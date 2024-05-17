import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminVerticalNav from './AdminVerticalNav';
import { addEmployee } from '../Styles';
const AddEmployee = () => {
    const [adminData, setAdminData] = useState({ user_id: '' });
    const [employeeData, setEmployeeData] = useState({
        user_id: '',
        job_specialization: '',
        nic_num: ''
    });

    const handleAdminChange = (e) => {
        const { name, value } = e.target;
        setAdminData({ ...adminData, [name]: value });
    };

    const handleEmployeeChange = (e) => {
        const { name, value } = e.target;
        setEmployeeData({ ...employeeData, [name]: value });
    };

    const handleAdminSubmit = (e) => {
        e.preventDefault();
        // Add logic to handle admin form submission
        console.log('Admin data submitted:', adminData);
    };

    const handleEmployeeSubmit = (e) => {
        e.preventDefault();
        // Add logic to handle employee form submission
        console.log('Employee data submitted:', employeeData);
    };

    return (
        <div>
            <div style={{ display: 'flex' }}>
                <AdminVerticalNav />
                <div style={{ flex: 1 }} className='container addEmp'>
                    <h1>Add New Employee / Admin</h1>
                    <div className="row">
                        <div className="col-lg-6 admin">
                            <form onSubmit={handleAdminSubmit}>
                                <h3>Add Admin</h3>
                                <div className="form-group">
                                    <label htmlFor="admin_user_id">USER ID</label>
                                    <input
                                        type="text"
                                        id="admin_user_id"
                                        name="user_id"
                                        value={adminData.user_id}
                                        onChange={handleAdminChange}
                                        required
                                    />
                                </div>
                                <div className="button">
                                    <button type="submit" className='btn'>Add Admin</button>
                                </div>
                            </form>
                        </div>
                        <div className="col-lg-6 employee">
                            <form onSubmit={handleEmployeeSubmit}>
                                <h3>Add Employee</h3>
                                <div className="form-group">
                                    <label htmlFor="employee_user_id">USER ID</label>
                                    <input
                                        type="text"
                                        id="employee_user_id"
                                        name="user_id"
                                        value={employeeData.user_id}
                                        onChange={handleEmployeeChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="job_specialization">Job Specialization</label>
                                    <input
                                        type="text"
                                        id="job_specialization"
                                        name="job_specialization"
                                        value={employeeData.job_specialization}
                                        onChange={handleEmployeeChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="nic_num">NIC Number</label>
                                    <input
                                        type="text"
                                        id="nic_num"
                                        name="nic_num"
                                        value={employeeData.nic_num}
                                        onChange={handleEmployeeChange}
                                        required
                                    />
                                </div>
                                <div className="button">
                                    <button type="submit" className='btn'>Add Employee</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddEmployee;
