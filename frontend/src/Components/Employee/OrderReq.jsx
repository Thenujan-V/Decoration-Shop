import React, { useEffect, useState } from 'react'
import VerticalNavbar from './VerticalNavbar'
import { useParams } from 'react-router-dom'

const OrderReq = () => {
    const params = useParams()
    const order_id = params.order_id

    const res = [
        {deadLine:'22/2/2024', allowance:'2000'}
    ]
    const [apiResponse,setApiResponse] = useState([])

    useEffect(() => {
        setApiResponse(res)
    },[])


  return (
    <div>
        <div style={{display:'flex', height:'100vh'}}>
            <VerticalNavbar />
            <div style={{flex:1}}>
            <div className='container orderWorks' style={{flex:1}}>
                <h1>ORDER ID {order_id}</h1>
                <div className='row'>
                    <div className="col-lg-6 details">
                            <h1>ORDER DETAILS</h1>
                            <div className="detail">
                                <h3>Flower Boutique</h3>
                                <h4>Quantity : 2</h4>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab at aperiam pariatur voluptate ex delectus debitis vero omnis minima quas.</p>
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
                <div className="buttons">
                    <button className='btn accept'>Accept</button>
                    <button className='btn reject'>Reject</button>
                </div>
            </div>
            </div>
        </div>
    </div>
  )
}

export default OrderReq