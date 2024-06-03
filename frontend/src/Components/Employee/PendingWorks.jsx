import React, { useEffect, useState } from 'react'
import { allowance, pendingWorks } from '../../Components/Styles'
import VerticalNavbar from './VerticalNavbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import { useNavigate, useParams } from 'react-router-dom'
import { getAllowanceDetails, getOrderDetails, statusUpdate } from '../../Services/EmployeeService'
import { retrieveToken } from '../../Services/JwtToken'


const PendingWorks = () => {
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

    const [pendingWorks, setPendingWorks] = useState([])
    const [apiResponse,setApiResponse] = useState([])
    const [allowance, setAllowance] = useState([])


    useEffect(() => {
        const fetchOrderStatus = async(order_id) => {
            try{
                const response = await getOrderDetails(order_id)
                // console.log('ordesworl : ',response.data)
                setPendingWorks(response.data)
            }
            catch(error){
                console.log('error fetching orders :', error.response)
            }
        }
        fetchOrderStatus(order_id)

        const getAllowance = async(employee_id, order_id) => {
            try{
                const response = await getAllowanceDetails(employee_id, order_id)
                setAllowance(response.data)
            }
            catch(error){
                console.log('error fetch allowance details :',error.response.data)
            }
        }
        getAllowance(employee_id, order_id)
        
    },[order_id, employee_id])

    const handleStatus = async(status) => {
        try{
            const response = await statusUpdate(employee_id, order_id, status)
            setApiResponse(response.data)
            window.location.reload();

        }
        catch(error){
            console.log('error update status :',error.response)
        }
    }
    console.log(pendingWorks)
  return (
    <div>
        <div style={{display:'flex'}}>
            <VerticalNavbar />
            <div className='container pendingWorks' style={{flex:1}}>
                <h1>PENDING ORDERS (ORDER_ID: {order_id})</h1>
                <div className='row'>
                    <div className="col-7 details">
                            {
                                pendingWorks && pendingWorks.length > 0 && pendingWorks.map((detail) => (
                                    <div className="detail" key={detail.service_id}>
                                        <h3>{detail.service_name} - {detail.quantity}</h3>
                                        <img src={detail.photoUrl} alt="image" width={'200px'}/>
                                        <p>({detail.description})</p>
                                    </div>
                                ))
                            }
                            
                    </div>
                    <div className="col-5">
                        <div className='row'>
                        <div className="col-lg-12 ">
                            <div className="status">
                                <div>
                                    <p>Started Working</p>
                                    <div className="tick">
                                        {
                                            pendingWorks && pendingWorks.length > 0 && (
                                                pendingWorks[0].status === "on going" || 
                                                pendingWorks[0].status ===  "delivery processing" || 
                                                pendingWorks[0].status === "finished") ? (
                                                <button className='btn' id="okey"  onClick={() => handleStatus({work_status : " "})} ><FontAwesomeIcon icon={faCircleCheck} size='xl' style={{color: "#34b823"}}/></button>
                                            ):(<button className='btn' onClick={() => handleStatus({work_status : "on going"})} id="not_okey"><FontAwesomeIcon icon={faCircle} size='xl' style={{color: "#34b823"}}/></button>)
                                        }
                                        
                                    </div>
                                </div>
                                <div>
                                    <p>Completed Order</p>
                                    <div className="tick">
                                        {
                                            pendingWorks && pendingWorks.length > 0 && (
                                                pendingWorks[0].status === "finished" || 
                                                pendingWorks[0].status === "delivery processing")  ? (
                                                <button className='btn' id="okey"  onClick={() => handleStatus({work_status : "on going"})} ><FontAwesomeIcon icon={faCircleCheck} size='xl' style={{color: "#34b823"}}/></button>
                                            ):(<button className='btn' onClick={() => handleStatus({work_status : "finished"})} id="not_okey"><FontAwesomeIcon icon={faCircle} size='xl' style={{color: "#34b823"}}/></button>)
                                        }                                    
                                    </div>
                                </div>
                                <div>
                                    <p>Handed over</p>
                                        <div className="tick">
                                        {
                                            pendingWorks && pendingWorks.length > 0 && pendingWorks[0].status === "delivery processing" ? (
                                                <button className='btn' id="okey"  onClick={() => handleStatus({work_status : "finished"})} ><FontAwesomeIcon icon={faCircleCheck} size='xl' style={{color: "#34b823"}}/></button>
                                            ):(<button className='btn' onClick={() => handleStatus({work_status : "delivery processing"})} id="not_okey"><FontAwesomeIcon icon={faCircle} size='xl' style={{color: "#34b823"}}/></button>)
                                        }
                                        </div>
                                </div>
                            </div>
                            
                        </div>
                        <div className="col-lg-12 info">
                        {
                            allowance.length > 0 && (
                                <>
                                    <p className='date'>DEADLINE - 
                                        {   pendingWorks && pendingWorks.length > 0 &&
                                            new Date(pendingWorks[0].deadline).toLocaleDateString()
                                        }</p>
                                    <p className='allowance'>Allowance - {allowance[0].total_amount} LKR</p>
                                </>
                            )
                        }
                        </div>
                    </div>  
                    </div>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default PendingWorks