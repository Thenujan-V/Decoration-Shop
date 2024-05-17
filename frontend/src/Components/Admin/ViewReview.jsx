import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AdminVerticalNav from './AdminVerticalNav'

const ViewReview = () => {
    const cust_id = useParams()
    
    const [getReview, setGetReview] = useState([])
    const [custReview, setCuseReview] = useState('')

    useEffect(() => {
        const fetchReviews = async() => {
            try{
                const response = await getReview()
                console.log('review :', response)
                setGetReview(response.data)
            }
            catch(error){
                console.log('error occure when get reviews :', error)
            }
            fetchReviews()
        }
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