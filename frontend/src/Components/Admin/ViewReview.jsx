import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AdminVerticalNav from './AdminVerticalNav'

const ViewReview = () => {
    const cust_id = useParams()
    const review = [
        { id: 'E001', name: 'John Doe', createdDate:'10th july 2203', NIC:'20001980989789', contact_no:'0709887890', email:'john@gmail.com', rating:'3', msg:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit, dolores.' },
        { id: 'E002', name: 'Cane Smith', createdDate:'12th sep 2203', NIC:'20001980989789', contact_no:'0709887890', email:'john@gmail.com', rating:'3', msg:'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis aperiam soluta voluptatum, nobis dolore aut?' },
        { id: 'E003', name: 'Jane Smith', createdDate:'12th june 2203', NIC:'20001980989789', contact_no:'0709887890', email:'john@gmail.com', rating:'2', msg:'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis aperiam soluta voluptatum, nobis dolore aut?' },
        { id: 'E004', name: 'Lane Smith', createdDate:'12th june 2203', NIC:'20001980989789', contact_no:'0709887890', email:'john@gmail.com', rating:'5', msg:'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis aperiam soluta voluptatum, nobis dolore aut?' },
        { id: 'E005', name: 'Pane Smith', createdDate:'12th june 2203', NIC:'20001980989789', contact_no:'0709887890', email:'john@gmail.com', rating:'5', msg:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit, dolores.'   },
        { id: 'E006', name: 'Alice Johnson', createdDate:'15th july 2203', NIC:'20001980989789', contact_no:'0709887890', email:'john@gmail.com', rating:'4', msg:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit, dolores.'  }
    
    ]

    const [getReview, setGetReview] = useState([])
    const [custReview, setCuseReview] = useState('')

    useEffect(() => {
        setGetReview(review)
    },[])

    const findReview = getReview?.find((review) => review.id === cust_id.cust_id)
    useEffect(() => {
        setCuseReview(findReview)
    })

console.log(custReview)
  return (
    <div>
        <div style={{display:'flex', height:'100vh'}}>
        <AdminVerticalNav />
        <div style={{flex:1}} className='container payments'>
            <h1>Review</h1>
            {
                custReview && 
                <div>
                        {<h2>{custReview.id}</h2>}
                        <div className="details">
                            <h3 >ALLOWANCE DETAILS</h3>
                            <div className='detail'>
                                <p className='qes'>MESSAGE</p>
                                <p className='ans' style={{fontWeight:'500', fontSize:'22px'}}>- {custReview.msg}</p>
                            </div>
                        </div>
                </div>
            }
        </div>
        </div>
    </div>
  )
}

export default ViewReview