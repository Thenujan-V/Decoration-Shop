import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdminVerticalNav from './AdminVerticalNav';
import { addEmployee } from '../Styles';
import { addNewAdmin, addNewEmp } from '../../Services/AdminServices';
import { retrieveToken } from '../../Services/JwtToken';
const AddEmployee = () => {

    const navigate = useNavigate()
    const decoded = retrieveToken()
    
    useEffect(() => {
        if(decoded){
        const userRole = decoded.role
        if(userRole === 'user' || userRole === 'employee'){
            navigate('/unauthorized')
        }
        }
    }, [decoded])

    const [adminRes, setAdminRes] = useState('')
    const [adminData, setAdminData] = useState({ user_Id: '' });
    const [employeeData, setEmployeeData] = useState({
        user_Id: '',
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

    const handleEmployeeSubmit = async (e, employeeData) => {
        e.preventDefault();
        try{
            const response = await addNewEmp(employeeData)
            if(response.status === 201){
                alert('Employee signup successful')
                setAdminRes(response.status)
            }
        }
        catch(error){
            console.log('employee add fail :', error)
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
                            <form onSubmit={(e) => handleEmployeeSubmit(e, employeeData)}>
                                <div className="form-group">
                                    <label htmlFor="employee_user_Id">USER ID</label>
                                    <input
                                        type="text"
                                        id="employee_user_Id"
                                        name="user_Id"
                                        value={employeeData.user_Id}
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
