import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AdminVerticalNav from './AdminVerticalNav'
import { getOrdersDetails } from '../../Services/OrderService'
import { asignEmployee, getAllEmployees } from '../../Services/AdminServices'

const AssignEmployee = () => {
    const params = useParams()
    const order_id = params.order_id

    const [apiResponse,setApiResponse] = useState([])
    const [employees, setEmployees] = useState([])
    const [asignEmpRes, setAsignEmpRes] = useState('')
    const [asignPayment, setAsignPayment] = useState('')
    const [selectedEmployee, setSelectedEmployee] = useState();

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

    useEffect(() => {
        const fetchEmployees = async () => {
            try{
                const response = await getAllEmployees()
                setEmployees(response.data)
            }
            catch(error){
                console.log('Employees fetching error : ', error)
            }
        }
        fetchEmployees()
    }, [])

    const handleSubmit = async(e, order_id,selectedEmployee, asignPayment) => {
        e.preventDefault()
        if(!(selectedEmployee === '')){
            const data = {
                order_id : order_id,
                employee_id : selectedEmployee,
                cash_allowance : asignPayment
            }
            try{
                const response = await asignEmployee(data)
                setAsignEmpRes(response)
            }
            catch(error){
                if(error.response.status === 500){
                    alert ('alredy asigned employee for this order')
                }
                console.log('assign employee error : ',error)
            }
        }

    };
console.log('selected emp :', selectedEmployee)
console.log('payment :', asignPayment)

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
                            <div className="row">
                            <div className="dates col-lg-6">
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
                            
                            <div className="buttons mt-5 p-0 col-lg-6">
                                <form onSubmit={(e) => handleSubmit(e,order_id,selectedEmployee, asignPayment)}>
                                    <div className='form-control'>
                                        <label htmlFor="emp">Select Employee</label>
                                        <select 
                                            className='btn accept m-0' 
                                            name='emp'
                                            style={{ backgroundColor: 'rgb(19, 185, 19)', height: '5vh', width: '12vw' }} 
                                            value={selectedEmployee}
                                            onChange={(e) => setSelectedEmployee(e.target.value)}
                                        >
                                            <option value=""> SELECT</option>
                                            {employees.map(employee => (
                                                <option key={employee.id} value={employee.employee_id} >
                                                    {employee.first_name}
                                                </option>
                                            ))}
                                        </select>   
                                    </div>
                                    <div className='form-control'>
                                        <label htmlFor="payment">Estimate Payment</label>
                                        <input type="text" name='payment' value={asignPayment} onChange={(e) => setAsignPayment(e.target.value)}/> 
                                    </div> 
                                    <div className='form-control'>
                                        <button type='submit' className='btn'>Assing Employee</button>
                                    </div>  
                                </form>
                            </div>
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