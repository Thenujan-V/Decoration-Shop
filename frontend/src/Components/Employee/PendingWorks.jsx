import React, { useEffect, useState } from 'react'
import { pendingWorks } from '../Styles'
import VerticalNavbar from './VerticalNavbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import { useParams } from 'react-router-dom'


const PendingWorks = () => {
    const params = useParams()
    const order_id = params.order_id

    const pending_works = [
        {order_id:'1123', status:'work started'},
        {order_id:'1124', status:'work started'},
        {order_id:'1125', status:'work started'}
    ]

    const res = [
        {deadLine:'22/2/2024', allowance:'2000'}
    ]
    const [pendingWorks, setPendingWorks] = useState([])
    const [apiResponse,setApiResponse] = useState([])

    useEffect(() => {
        setApiResponse(res)
        setPendingWorks(pending_works)
    },[])

    const not_okey = document.getElementById('not_okey')
    const okey = document.getElementById('okey')
   if(not_okey && okey){
            not_okey.style.display = 'block'
            okey.style.display = 'none'
   }
    const circle = () => {
        if(not_okey){
            not_okey.style.display = 'none'
            okey.style.display = 'block'
        }
    }
    const checkCircle = () => {
        if(okey){
            not_okey.style.display = 'block'
            okey.style.display = 'none'
        }
    }

    const work = pendingWorks.find((work) => work.order_id === order_id)
    console.log('work : ',work)

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
                                <p>Accept Order</p>
                                <div className="tick">
                                    <button className='btn' onClick={circle} id="not_okey"><FontAwesomeIcon icon={faCircle} size='xl' style={{color: "#34b823"}}/></button>
                                    <button className='btn' onClick={checkCircle} id="okey"><FontAwesomeIcon icon={faCircleCheck} size='xl' style={{color: "#34b823", }}/></button>
                                </div>
                            </div>
                            <div>
                                <p>Started Working</p>
                                <div className="tick">
                                    <button className='btn' onClick={circle} id="not_okey"><FontAwesomeIcon icon={faCircle} size='xl' style={{color: "#34b823"}}/></button>
                                    <button className='btn' onClick={checkCircle} id="okey"><FontAwesomeIcon icon={faCircleCheck} size='xl' style={{color: "#34b823"}}/></button>
                                </div>
                            </div>
                            <div>
                                <p>Completed Order</p>
                                <div className="tick">
                                    <button className='btn' onClick={circle} id="not_okey"><FontAwesomeIcon icon={faCircle} size='xl' style={{color: "#34b823"}}/></button>
                                    <button className='btn' onClick={checkCircle} id="okey"><FontAwesomeIcon icon={faCircleCheck} size='xl' style={{color: "#34b823"}}/></button>
                                </div>
                            </div>
                            <div>
                                <p>Handed over</p>
                                <div className="tick">
                                    <button className='btn' onClick={circle} id="not_okey"><FontAwesomeIcon icon={faCircle} size='xl' style={{color: "#34b823"}}/></button>
                                    <button className='btn' onClick={checkCircle} id="okey"><FontAwesomeIcon icon={faCircleCheck} size='xl' style={{color: "#34b823"}}/></button>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div className="col-lg-6 info">
                    {
                        apiResponse.length > 0 && (
                            <>
                                <p className='date'>DEADLINE - {apiResponse[0].deadLine}</p>
                                <p className='allowance'>Approx. Allowance - {apiResponse[0].allowance} LKR</p>
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