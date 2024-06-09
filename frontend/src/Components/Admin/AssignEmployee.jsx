import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AdminVerticalNav from './AdminVerticalNav';
import { getOrdersDetails } from '../../Services/OrderService';
import { asignEmployee, getAllEmployees, getAllowance, updateDeliveryStatus } from '../../Services/AdminServices';
import { retrieveToken } from '../../Services/JwtToken';
import { getUserDetails } from '../../Services/UserService';
import { assingEmployee } from '../Styles'; 
import { all } from 'axios';
import { toast } from 'react-toastify';

const AssignEmployee = () => {
    const params = useParams();
    const order_id = params.order_id;
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

    const [apiResponse, setApiResponse] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [asignEmpRes, setAsignEmpRes] = useState('');
    const [asignPayment, setAsignPayment] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [customer, setCustomer] = useState();
    const [allowance, setAllowance] = useState('')

    useEffect(() => {
        const fetchDatas = async (order_id) => {
            try {
                const response = await getOrdersDetails(order_id);
                setApiResponse(response.data);
            } catch (error) {
                console.log('Order details fetching error:', error);
            }
        };
        fetchDatas(order_id);

        const getEmpAllowance = async (order_id) => {
            try {
                const response = await getAllowance(order_id);
                console.log('allowa :', response.data)
                setAllowance(response.data);
            } catch (error) {
                console.log('allowance details fetching error:', error);
            }
        };
        getEmpAllowance(order_id);

    }, [order_id]);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await getAllEmployees();
                setEmployees(response.data);
            } catch (error) {
                console.log('Employees fetching error:', error);
            }
        };
        fetchEmployees();

        const fetchUserDetails = async () => {
            try {
                if (apiResponse.length > 0) {
                    const userId = apiResponse[0].user_Id;
                    const response = await getUserDetails(userId);
                    setCustomer(response.data);
                }
            } catch (error) {
                console.log('User details fetching error:', error);
            }
        };
        fetchUserDetails();
    }, [apiResponse]);




    const handleSubmit = async (e) => {
        e.preventDefault();
        if (selectedEmployee) {
            const data = {
                order_id: order_id,
                employee_id: selectedEmployee,
                cash_allowance: asignPayment
            };
            try {
                const response = await asignEmployee(data);
                setAsignEmpRes(response);
                toast.success('Successfully assigned employee for this order', {
                     autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });

            } catch (error) {
                if (error.response.status === 500) {
                    toast.error('Already assigned employee for this order', {
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                      });
                }
                console.log('Assign employee error:', error);
            }
        }
    };
   
    const handleDelivery = async() => {
        const data = {
            status : 'delivered'
        }
        try{
            await updateDeliveryStatus(data, order_id)
        }
        catch(error){
            console.log('error :', error)
        }
    }

    return (
        <div style={{ display: 'flex' }}>
            <AdminVerticalNav />
            <div style={{ flex: 1 }} className='assignEmp'>
                <div className="container">
                    <h1>ORDER ID {order_id}</h1>
                    <div className="details">
                        <h1>ORDER DETAILS</h1>
                        <div className="row">
                            <h2 className="col-lg-3">Service Id</h2>
                            <h2 className="col-lg-3">Service Name</h2>
                            <h2 className="col-lg-3">Image</h2>
                            <h2 className="col-lg-3">Quantity</h2>
                        </div>
                        <div>
                            {apiResponse && apiResponse.map((detail) => (
                                <div className="row" key={detail.service_id}>
                                    <h5 className="col-lg-3">{detail.service_id}</h5>
                                    <h5 className="col-lg-3">{detail.service_name}</h5>
                                    <img className="col-lg-3" src={detail.photoUrl} alt="image" width={'100px'} />
                                    <h5 className="col-lg-3">{detail.quantity}</h5>
                                </div>
                            ))}
                            <div className="dates col-lg-4">
                                {customer && (
                                    <div>
                                        <p>User Id: {customer[0].user_Id}</p>
                                        <p>User Name: {customer[0].first_name} {customer[0].last_name}</p>
                                        <p>Phone Number: {customer[0].contact_no}</p>
                                        <p>Address: {customer[0].adress}</p>
                                    </div>
                                )}
                            </div>
                            <div className="row">
                                <div className="dates col-lg-6">
                                    {(apiResponse && apiResponse.length > 0) && (
                                        <div>
                                            <p>Working Employee: 
                                                {   allowance && allowance.length > 0  ? 
                                                        <Link to={`/viewemployee/${allowance[0].employee_id}`}> {allowance[0].employee_id}</Link>: ' Not Assignd Employee'
                                                }
                                            </p>
                                            <p>Task Acceptance:
                                                {
                                                    allowance && allowance.length > 0 ?
                                                    (allowance[0].task_acceptence === 1 ? ' Accept' : allowance[0].task_acceptence === 0 ? ' Not Accept' : ' Waiting') : ' Not Assignd Employee'

                                                }
                                            </p>
                                            <p>Allowance: 
                                                {
                                                    allowance && allowance.length > 0 ? ` ${allowance[0].total_amount} LKR` : ' Not Allocate Allowance'
                                                }
                                            </p>
                                            <p>Allowance Status: 
                                                {
                                                    allowance && allowance.length > 0 ?
                                                    (allowance[0].allowance_status === '1' ? ' completed' : ' Not Completed'): ' Not Allocate Allowance'
                                                }
                                            </p>
                                            <p>Customer Payment Status: {apiResponse[0].payment_status}</p>
                                            <p>Working Status: {apiResponse[0].status}</p>
                                            <p>Ordered Date: {new Date(apiResponse[0].order_date).toLocaleDateString()}</p>
                                            <p>Delivery Date: {new Date(apiResponse[0].deadline).toLocaleDateString()}</p>
                                        </div>
                                    )}
                                </div>
                                <div className="buttons col-lg-6">
                                    {
                                        allowance.length === 0 ? (
                                            <form onSubmit={handleSubmit}>
                                                <div className="form-control">
                                                    <label htmlFor="emp">Select Employee</label>
                                                    <select
                                                        name="emp"
                                                        value={selectedEmployee}
                                                        onChange={(e) => setSelectedEmployee(e.target.value)}
                                                    >
                                                        <option value="">SELECT</option>
                                                        {employees.map(employee => (
                                                            <option key={employee.id} value={employee.employee_id}>
                                                                {employee.first_name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="form-control">
                                                    <label htmlFor="payment">Estimate Payment</label>
                                                    <input
                                                        type="text"
                                                        name="payment"
                                                        value={asignPayment}
                                                        onChange={(e) => setAsignPayment(e.target.value)}
                                                    />
                                                </div>
                                                <div className="form-control">
                                                    <button type="submit">Assign Employee</button>
                                                </div>
                                            </form> 
                                        ): null
                                    }
                                </div>
                                <div>
                                    { apiResponse && apiResponse.length > 0 && apiResponse[0].status === 'delivery processing' &&
                                        <p style={{fontSize:'20px', fontWeight:'bold', fontStyle:'italic', color:'#03044F'}}>if complte delivery process click this <button className='btn btn-success' onClick={handleDelivery}>Delivery Completed</button></p>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AssignEmployee;
