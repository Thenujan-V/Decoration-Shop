import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdminVerticalNav from './AdminVerticalNav';
import { addEmployee } from '../Styles';
import { addNewAdmin, addNewEmp, getAllCustomers } from '../../Services/AdminServices';
import { retrieveToken } from '../../Services/JwtToken';
import { toast } from 'react-toastify';

const AddEmployee = () => {

    const navigate = useNavigate();
    const decoded = retrieveToken();

    useEffect(() => {
        if(decoded){
            const userRole = decoded.role;
            if(userRole === 'user' || userRole === 'employee'){
                navigate('/unauthorized');
            }
        }
    }, [decoded]);

    const [users, setUsers] = useState([]);
    const [adminRes, setAdminRes] = useState('');
    const [adminData, setAdminData] = useState({ user_Id: '' });
    const [employeeData, setEmployeeData] = useState({
        user_Id: null,
        job_specialization: '',
        nic_num: ''
    });
    const [selectedUserName, setSelectedUserName] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersList = await getAllCustomers();
                setUsers(usersList.data);
            } catch (error) {
                console.error('Failed to fetch users:', error);
            }
        };
        fetchUsers();
    }, []);

    const handleAdminChange = (e) => {
        const { name, value } = e.target;
        setAdminData({ ...adminData, [name]: value });
    };

    const handleEmployeeChange = (e) => {
        const { name, value } = e.target;
        setEmployeeData({ ...employeeData, [name]: value });
    };

    const handleUserNameChange = (e) => {
        setSelectedUserName(e.target.value);
    };

    const handleEmployeeSubmit = async (e) => {
        e.preventDefault();
        const selectedUser = users.find(user => user.user_Id === Number(employeeData.user_Id) && user.first_name === selectedUserName);
    
        if (!selectedUser) {
            toast.error('Selected User ID and User Name do not match.', {
                 autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            return;
        }
        try {
            const response = await addNewEmp(employeeData);
            if (response.status === 201) {
                toast.success('Employee signup successful', {
                     autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                setAdminRes(response.status);
            }
        } catch (error) {
            console.log('employee add fail :', error);
            toast.error('Employee signup failed. ', {
                 autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
        }
    };

    return (
        <div>
            <div style={{ display: 'flex' }}>
                <AdminVerticalNav />
                <div style={{ flex: 1 }} className='container addEmp'>
                    <h1>Add New Employee</h1>
                    <div className="row">
                        <div className=" employee">
                            <form onSubmit={handleEmployeeSubmit}>
                                <div className="form-group">
                                    <label htmlFor="employee_user_Id">USER ID</label>
                                    <select
                                        id="employee_user_Id"
                                        name="user_Id"
                                        value={employeeData.user_Id}
                                        onChange={handleEmployeeChange}
                                        required
                                    >
                                        <option value="" disabled>Select User ID</option>
                                        {users && users.length > 0 && users.map(user => (
                                            <option key={user.user_Id} value={user.user_Id}>
                                                {user.user_Id}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="employee_first_name">User Name</label>
                                    <select
                                        id="employee_first_name"
                                        value={selectedUserName}
                                        onChange={handleUserNameChange}
                                        required
                                    >
                                        <option value="" disabled>Select User Name</option>
                                        {users && users.length > 0 && users.map(user => (
                                            <option key={user.user_Id} value={user.first_name}>
                                                {user.first_name}
                                            </option>
                                        ))}
                                    </select>
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
