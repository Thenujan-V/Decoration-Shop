import React, { useEffect, useState } from 'react'
import { pendingWorks } from '../../Components/Styles'
import VerticalNavbar from './VerticalNavbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import { useNavigate, useParams } from 'react-router-dom'
import { getOrderDetails, statusUpdate } from '../../Services/EmployeeService'
import { retrieveToken } from '../../Services/JwtToken'


const PendingWorks = () => {
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

    const params = useParams()
    const order_id = params.order_id
    const employee_id = params.employee_id

    const [pendingWorks, setPendingWorks] = useState([])
    const [apiResponse,setApiResponse] = useState([])

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
    },[])

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
                <h1>PENDING ORDER ({order_id})</h1>
                <div className='row'>
                    <div className="col-12 details">
                            {
                                pendingWorks && pendingWorks.length > 0 && pendingWorks.map((detail) => (
                                    <div className="detail" key={detail.service_id}>
                                        <h3>{detail.service_name} - {detail.quantity}</h3>
                                        <p>({detail.description})</p>
                                    </div>
                                ))
                            }
                            
                    </div>
                </div>
                <div className='row'>
                    <div className="col-lg-6">
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
                    <div className="col-lg-6 info">
                    {
                        pendingWorks.length > 0 && (
                            <>
                                <p className='date'>DEADLINE - {new Date(pendingWorks[0].deadline).toLocaleDateString()}</p>
                                <p className='allowance'>Approx. Allowance - {pendingWorks[0].cash_allowance} LKR</p>
                            </>
                        )
                    }
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PendingWorks