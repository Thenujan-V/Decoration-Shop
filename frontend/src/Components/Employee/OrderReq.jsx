import React, { useEffect, useState } from 'react'
import VerticalNavbar from './VerticalNavbar'
import { useNavigate, useParams } from 'react-router-dom'
import { getOrderDetails, taskAcceptence } from '../../Services/EmployeeService'
import { retrieveToken } from '../../Services/JwtToken'

const OrderReq = () => {
    const navigate = useNavigate()
    const decoded = retrieveToken()
    
    useEffect(() => {
        if(decoded){
        const userRole = decoded.role
        if(userRole === 'user' || userRole === 'admin'){
            navigate('/unauthorized')
        }
        }
    }, [decoded])

    const params = useParams()
    const order_id = params.order_id
    const employee_id = params.employee_id

    const [apiResponse,setApiResponse] = useState([])
    const [acceptRes, setAcceptRes] = useState('')

    useEffect(() => {
        const fetchOrderDetails = async(order_id) => {
            try{
                const response = await getOrderDetails(order_id)
                setApiResponse(response.data)
            }
            catch(error){
                console.log('error fetch order details :',error.response.data)
            }
        }
        fetchOrderDetails(order_id)
    },[order_id])

    const handelClickAccept = async (employee_id, order_id, data) => {
        console.log(employee_id,  order_id, data)
        try{
            const response = await taskAcceptence(employee_id, order_id, data)
            console.log('update res :', response)
            setAcceptRes(response.data)
        }
        catch(error){
            console.log('error update :',error.response.data)
        }
    }

    // const handelClickReject = async() => {
    //     try{
    //         const response = await 
    //         setAcceptRes(response.data)
    //     }
    //     catch(error){
    //         console.log('error update :',error.response.data)
    //     }
    // }

console.log('res :',apiResponse)

  return (
    <div>
        <div style={{display:'flex'}}>
            <VerticalNavbar />
            <div style={{flex:1}}>
            <div className='container orderWorks' style={{flex:1}}>
                <h1>ORDER ID {order_id}</h1>
                <div className='row'>
                    <div className="col-lg-6 details">
                            <h1>ORDER DETAILS</h1>
                            {
                                apiResponse && apiResponse.length > 0 && apiResponse.map((detail) => (
                                    <div className="detail" key={detail.service_id}>
                                        <h3>{detail.service_name} - {detail.quantity}</h3>
                                        <img src={detail.photoUrl} alt="image" />
                                        <p>({detail.description})</p>
                                    </div>
                                ))
                            }
                            
                    </div>
                    <div className="col-lg-6 info">
                    {
                        apiResponse.length > 0 && (
                            <>
                                <p className='date'>DEADLINE - {new Date(apiResponse[0].deadline).toLocaleDateString()}</p>
                                <p className='allowance'>Approx. Allowance - {apiResponse[0].allowance} LKR</p>
                            </>
                        )
                    }
                    </div>
                </div>
                <div className="buttons">
                    <button className='btn accept' onClick={() => handelClickAccept(employee_id, order_id, {"task_acceptence": "1"})}>Accept</button>
                    <button className='btn reject' onClick={() => handelClickAccept(employee_id, order_id, {"task_acceptence": "0"})}>Reject</button>
                </div>
            </div>
            </div>
        </div>
    </div>
  )
}

export default OrderReq