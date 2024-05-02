import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import VerticalNavbar from '../Employee/VerticalNavbar'
import { background } from '../Assets'
import AdminVerticalNav from './AdminVerticalNav'

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
        setApiResponse(res)
    },[])

    const handleEmployeeChange = (event) => {
        setSelectedEmployee(event.target.value);
    };

    const getFirstResponse = () => {
        return apiResponse.length > 0 ? apiResponse[0] : null;
    };
    const firstResponse = getFirstResponse();
  return (
    <div style={{display:'flex', height:'100vh'}}>
        <AdminVerticalNav />
        <div style={{flex:1}}>
        <div className='container orderWorks ' style={{flex:1 }}>
            <h1>ORDER ID {order_id}</h1>
            <div className='m-5 p-0' style={{display:'flex', justifyContent:'center', alignItems:'center', textAlign:'center'}}>
                <div className="details">
                        <h1>ORDER DETAILS</h1>
                        <div className="detail" >
                            {firstResponse && (
                                <div className="detail">
                                    <h3>Flower Boutique</h3>
                                    <h4 className='date'>Service ID - {firstResponse.serviceId}</h4>
                                    <h4 className='date'>DEADLINE - {firstResponse.deadLine}</h4>
                                    <h4>Quantity: 2</h4>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab at aperiam pariatur voluptate ex delectus debitis vero omnis minima quas.</p>
                                    <div className="buttons m-0 p-0">
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
                            )}

                        </div>
                </div>
                
            </div>
            
        </div>
        </div>
    </div>
  )
}

export default AssignEmployee