import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AdminVerticalNav from './AdminVerticalNav'
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';
import { getReview } from '../../Services/ReviewService';
import { retrieveToken } from '../../Services/JwtToken';

const ReviewCheck = () => {
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

    const [getApiReview, setGetApiReview] = useState([])

    useEffect(() => {
        const fetchReviews = async() => {
            try{
                const response = await getReview()
                setGetApiReview(response.data)
            }
            catch(error){
                console.log('error occure when get reviews :', error)
            }
        }
        fetchReviews()
    },[])

    console.log(getApiReview)

  return (
    <div style={{display:'flex'}}>
        <AdminVerticalNav />
        <div style={{flex:1}} className='container customers'>
            <h1>Reviews</h1>
            {
                getApiReview &&
                <div className='details mt-5' style={{width:'70vw'}}>
                    {
                        getApiReview.map((review) => (
                            <div className="row m-0 d-flex justify-content-center mt-2" >
                                <p className='col-lg-2 col-md-3 col-3'>{review.user_Id}</p>
                                <p className='col-lg-2 col-md-3 col-3 name'>{review.first_name}</p>
                                <div style={{ display: 'flex' }} className='col-lg-3 stars'>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <span
                                            key={star}
                                            style={{
                                                fontSize: '24px',
                                            }}
                                        >   
                                            <FontAwesomeIcon
                                                icon={star <= review.rating ? faStar : faStarEmpty}
                                                style={{ color: star <= review.rating ? 'gold' : 'gold' }}
                                                size='xl'
                                            />
                                        </span>
                                    ))}
                                </div>
                                <p className='col-lg-3 col-md-3 col-3' style={{fontSize:'16px', fontWeight:'normal'}}>{review.review ? review.review : 'No Reviews'}</p>
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