import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AdminVerticalNav from './AdminVerticalNav'
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';

const ReviewCheck = () => {
    const review = [
        { id: 'E001', name: 'John Doe', createdDate:'10th july 2203', NIC:'20001980989789', contact_no:'0709887890', email:'john@gmail.com', rating:'3', msg:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit, dolores.' },
        { id: 'E002', name: 'Cane Smith', createdDate:'12th sep 2203', NIC:'20001980989789', contact_no:'0709887890', email:'john@gmail.com', rating:'3', msg:'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis aperiam soluta voluptatum, nobis dolore aut?' },
        { id: 'E003', name: 'Jane Smith', createdDate:'12th june 2203', NIC:'20001980989789', contact_no:'0709887890', email:'john@gmail.com', rating:'2', msg:'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis aperiam soluta voluptatum, nobis dolore aut?' },
        { id: 'E004', name: 'Lane Smith', createdDate:'12th june 2203', NIC:'20001980989789', contact_no:'0709887890', email:'john@gmail.com', rating:'5', msg:'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis aperiam soluta voluptatum, nobis dolore aut?' },
        { id: 'E005', name: 'Pane Smith', createdDate:'12th june 2203', NIC:'20001980989789', contact_no:'0709887890', email:'john@gmail.com', rating:'5', msg:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit, dolores.'   },
        { id: 'E006', name: 'Alice Johnson', createdDate:'15th july 2203', NIC:'20001980989789', contact_no:'0709887890', email:'john@gmail.com', rating:'4', msg:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit, dolores.'  }
    
    ]

    const [getReview, setGetReview] = useState([])

    useEffect(() => {
        setGetReview(review)
    },[])
    console.log(getReview)

  return (
    <div style={{display:'flex', height:'100vh'}}>
        <AdminVerticalNav />
        <div style={{flex:1}} className='container customers'>
            <h1>CUSTOMER MANAGEMENT</h1>
            {
                getReview &&
                <div className='details mt-5' style={{width:'70vw'}}>
                    {
                        getReview.map((review) => (
                            <div className="row m-0 d-flex justify-content-center mt-2" >
                                <p className='col-lg-2 col-md-3 col-3'>{review.id}</p>
                                <p className='col-lg-2 col-md-3 col-3 name'>{review.name}</p>
                                <div style={{ display: 'flex' }} className='col-lg-3 stars'>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <span
                                            key={star}
                                            style={{
                                                cursor: 'pointer',
                                                fontSize: '24px',
                                            }}
                                            // onClick={() => handleStarClick(star)}
                                        >
                                            
                                            <FontAwesomeIcon
                                                icon={star <= review.rating ? faStar : faStarEmpty}
                                                style={{ color: star <= review.rating ? 'gold' : 'gold' }}
                                                size='xl'
                                            />
                                        </span>
                                    ))}
                                </div>  
                                <Link to={`/viewReview/${review.id}`} className='btn col-lg-2 col-md-3 col-3 view'>View</Link>
                                <Link className='btn col-lg-2 col-md-3 col-3 delete'>delete</Link>
                            </div>
                        ))
                    }
                </div>
            }
        </div>
    </div>
  )
}

export default ReviewCheck