import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { retrieveToken } from '../../Services/JwtToken';
import { getAllowanceDetails, getOrders, updateAllowanceStatus } from '../../Services/EmployeeService';
import AdminVerticalNav from './AdminVerticalNav';
import { getAllowance } from '../../Services/AdminServices';
import { all } from 'axios';

const ViewEmpOrders = () => {
    const navigate = useNavigate();
    const decoded = retrieveToken();
    
    useEffect(() => {
        if (decoded) {
            const userRole = decoded.role;
            if (userRole === 'user' || userRole === 'employee') {
                navigate('/unauthorized');
            }
        }
    }, [decoded, navigate]);

    const { emp_id } = useParams();
    const [orders, setOrders] = useState([]);
    const [allowanceDetails, setAllowanceDetails] = useState([])

    useEffect(() => {
        const fetchOrders = async (emp_id) => {
            try {
                const response = await getOrders(emp_id);
                setOrders(response.data);

                const allowanceDetailsPromises = response && response.data.map(async (order) => {
                    const allowanceResponse = await getAllowanceDetails(emp_id, order.order_id)
                    return allowanceResponse.data
                })
                console.log('allo :', allowanceDetailsPromises)
 
                const allAllowanceDetails = await Promise.all(allowanceDetailsPromises);
                setAllowanceDetails(allAllowanceDetails.flat());

            } catch (error) {
                console.log('error occur :', error);
            }
        };
        fetchOrders(emp_id);
    }, [emp_id]);
    const addClassName = (status) => {
        switch (status) {
            case 'completed':
                return 'completed';
            case 'payment pending':
                return 'pending';
            case 'cancel':
                return 'cancelled';
            case 'delivery processing':
                return 'finished';
            case 'on going':
                return 'onGoing';
            case 'finished':
                return 'finished';
            case 'waiting':
                return 'waiting';
            case 'delivered':
                return 'delivered';
            default:
                return '';
        }
    };

    const handleUpdate = async(allowance_id, amount) => {
        const data = {
            allowance_status : '1',
            paid_amount : amount,
            balance_amount : 0
        }
        console.log(allowance_id, data)
        try{
            await updateAllowanceStatus(allowance_id, data)
            window.location.reload()
        }
        catch(error){
            console.log('error :', error)
        }
    }

    return (
        <div id='myOrders'>
            <div style={{ display: 'flex' }}>
                <AdminVerticalNav />
                <div style={{ flex: 1 }} className='container'>
                    <h1 className='text-center'>Orders Details</h1>
                    {orders.length > 0 ? (
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Created Date</th>
                                    <th>Order Date</th>
                                    <th>Deadline</th>
                                    <th>Status</th>
                                    <th>Task Acceptance</th>
                                    <th>Work Status</th>
                                    <th>Allowance</th>
                                    <th>Allowance Status</th>

                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order.order_id}>
                                        <td><Link to={`/employeeassign/${order.order_id}`}>OREDR ID-{order.order_id}</Link></td>
                                        <td>{new Date(order.created_date).toLocaleString()}</td>
                                        <td>{new Date(order.order_date).toLocaleString()}</td>
                                        <td>{new Date(order.deadline).toLocaleString()}</td>
                                        <td>{order.status}</td>
                                        <td>{order.task_acceptence !== null ? order.task_acceptence : 'N/A'}</td>
                                        <td className={addClassName(order.status)}>{order.work_status !== null ? order.work_status : 'N/A'}</td>
                                        {allowanceDetails.length > 0 && allowanceDetails.map((allowance) => (
                                            (order.order_id === allowance.order_id) && <td>{allowance.total_amount}</td>
                                        ))
                                        } 
                                        {allowanceDetails.length > 0 && allowanceDetails.map((allowance) => (
                                            (order.order_id === allowance.order_id) &&( (allowance.allowance_status) === '1' ?
                                            <p style={{fontWeight:'bold', color:'green'}}>Completed</p> : <button className='btn btn-danger' onClick={() => handleUpdate(allowance.allowance_id, allowance.balance_amount)}>Complete</button> )
                                        ))
                                        } 
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>There are no orders assigned yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ViewEmpOrders;
