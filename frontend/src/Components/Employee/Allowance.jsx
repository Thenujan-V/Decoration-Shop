import React, { useEffect, useState } from 'react'
import VerticalNavbar from './VerticalNavbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import { allowance } from '../Styles';

const Allowance = () => {
    const allowance = [
        {order_id:'1123',status:'completed', allowance:'3000'},
        {order_id:'1124',status:'completed', allowance:'3000'},
        {order_id:'1125',status:'on progress', allowance:'9000'},
        {order_id:'1126',status:'completed', allowance:'3000'},
        {order_id:'1127',status:'on progress', allowance:'5000'}
    ]

    const [apiReq, setApiReq] = useState([])
    const [selectedOrderId, setSelectedOrderId] = useState(null);


    useEffect(() => {
        setApiReq(allowance)
    },[])

    const handleButtonClick = (orderId) => {
        if (selectedOrderId === orderId) {
            setSelectedOrderId(null); 
        } else {
            setSelectedOrderId(orderId);
        }
    };
console.log('soid : ',selectedOrderId)
  return (
    <div>
        <div style={{display:'flex'}}>
            <VerticalNavbar />
            <div style={{flex:1}} className='container allowance'>
                <h1>Allowance</h1>
                <div className='details'>
                    <div className="row head">
                        <h3 className='col-lg-3'>ORDER ID</h3>
                        <h3 className='col-lg-3'>W.STATUS</h3>
                        <h3 className='col-lg-3'>ALLOWANCE</h3>
                        <h3 className='col-lg-3'>A.STATUS</h3>
                    </div>
                    <div className="detail">
                        {
                            apiReq.map((order, index) => (
                                <div className="row">
                                    <p className='col-lg-3'>ORDER_ID {order.order_id}</p>
                                    <p className='col-lg-3'>{order.status}</p>
                                    <p className='col-lg-3'>{order.allowance}</p>
                                    {/* <button className='btn col-lg-3'  id="not_okey"><FontAwesomeIcon icon={faCircle} size='xl' style={{color: "#34b823"}}/></button> */}
                                    {selectedOrderId === order.order_id ? (
                                        <button
                                            className="btn col-lg-3"
                                            onClick={() => handleButtonClick(order.order_id)}
                                        >
                                            <FontAwesomeIcon
                                                icon={faCircleCheck}
                                                size="xl"
                                                style={{ color: "#34b823" }}
                                            />
                                        </button>
                                    ) : (
                                        <button
                                            className="btn col-lg-3"
                                            onClick={() => handleButtonClick(order.order_id)}
                                        >
                                            <FontAwesomeIcon
                                                icon={faCircle}
                                                size="xl"
                                                style={{ color: "#34b823" }}
                                            />
                                        </button>
                                    )}
                                
                                
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Allowance