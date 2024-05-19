import React, { useEffect, useState } from 'react'
import { pendingWorks } from '../../Components/Styles'
import VerticalNavbar from './VerticalNavbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import { useParams } from 'react-router-dom'
import { getOrderDetails, statusUpdate } from '../../Services/EmployeeService'


const PendingWorks = () => {
    const params = useParams()
    const order_id = params.order_id
    const employee_id = params.employee_id

    const [pendingWorks, setPendingWorks] = useState([])
    const [apiResponse,setApiResponse] = useState([])

    useEffect(() => {
        const fetchOrderStatus = async(order_id) => {
            try{
                const response = await getOrderDetails(order_id)
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
        <div style={{display:'flex', height:'100vh'}}>
            <VerticalNavbar />
            <div className='container pendingWorks' style={{flex:1}}>
                <h1>ORDER ID {order_id}</h1>
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
                                <p className='allowance'>Approx. Allowance - {} LKR</p>
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