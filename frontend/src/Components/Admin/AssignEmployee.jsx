import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AdminVerticalNav from './AdminVerticalNav'
import { getOrdersDetails } from '../../Services/OrderService'

const AssignEmployee = () => {
    const params = useParams()
    const order_id = params.order_id

    const res = [
        {deadLine:'22/2/2024', allowance:'2000', serviceId:'002'}
    ]
    const employees = [
        { id: 'E001', name: 'John Doe' },
        { id: 'E002', name: 'Jane Smith' },
        { id: 'E003', name: 'Alice Johnson' }
    ];

    const [apiResponse,setApiResponse] = useState([])
    const [selectedEmployee, setSelectedEmployee] = useState('');

    useEffect(() => {
        const fetchDatas = async (order_id) => {
            try{
                const response = await getOrdersDetails(order_id)
                setApiResponse(response.data)
            }
            catch(error){
                console.log('order details fetching error : ', error)
            }
        }
        fetchDatas(order_id)
    },[])
    console.log(apiResponse[0])

    const handleEmployeeChange = (event) => {
        setSelectedEmployee(event.target.value);
    };

    // const getFirstResponse = () => {
    //     return apiResponse.length > 0 ? apiResponse[0] : null;
    // };
    // const firstResponse = getFirstResponse();
  return (
    <div style={{display:'flex'}}>
        <AdminVerticalNav />
        <div style={{flex:1}}>
        <div className='container orderWorks ' style={{flex:1 }}>
            <h1>ORDER ID {order_id}</h1>
            <div className='m-5 p-0' style={{display:'flex', justifyContent:'center', alignItems:'center', textAlign:'center'}}>
                <div className="details w-100">
                        <h1>ORDER DETAILS</h1>
                        <div className="row mt-5 p-0" style={{borderBottom:'4px solid green'}}>
                            <h2 className='col-lg-3'>Service Id</h2>
                            <h2 className='col-lg-3'>Service Name</h2>
                            <h2 className='col-lg-3'>Quantity</h2>
                            <h2 className='col-lg-3'>Total price</h2>
                        </div>
                        <div className="w-100 m-0 p-0" >
                            {apiResponse &&  apiResponse.map((detail) => (
                                <div className="row p-2" key={detail.service_id}>
                                    <h5 className='col-lg-3'>{detail.service_id}</h5>
                                    <h5 className='col-lg-3'>{detail.service_name}</h5>
                                    <h5 className='col-lg-3'>{detail.quantity}  ({detail.price} * {detail.quantity})</h5>
                                    <h5 className='col-lg-3'>{detail.price * detail.quantity}</h5>
                                </div>
                            ))
                            }
                            
                            <div className="dates">
                                {
                                    apiResponse && apiResponse.length > 0 &&
                                    <div>
                                        <p>Working Employee : {selectedEmployee}</p>
                                        <p>Payment Status : {apiResponse[0].payment_status}</p>
                                        <p>Working Status : {apiResponse[0].status}</p>
                                        <p>Orderd Date : {new Date(apiResponse[0].order_date).toLocaleDateString()}</p>
                                        <p>Delivery Date : {new Date(apiResponse[0].deadline).toLocaleDateString()}</p>
                                        
                                    </div>  
                                }   
                            </div>
                            
                            <div className="buttons mt-5 p-0">
                                        <button className='btn reject m-0' style={{ backgroundColor: 'var(--background_blue)', height:'6vh', width:'20vw' }}>ESTIMATE PAYMENT</button>
                                        <select 
                                            className='btn accept m-0' 
                                            style={{ backgroundColor: 'var(--yellow)', height: '6vh', width: '10vw' }} 
                                            value={selectedEmployee}
                                            onChange={handleEmployeeChange}
                                        >
                                            <option value="" disabled> ASSIGN EMPLOYEE</option>
                                            {employees.map(employee => (
                                                <option key={employee.id} value={employee.id}>
                                                    {employee.name}
                                                </option>
                                            ))}
                                        </select>   
                                    </div>

                        </div>
                </div>
                
            </div>
            
        </div>
        </div>
    </div>
  )
}

export default AssignEmployee 