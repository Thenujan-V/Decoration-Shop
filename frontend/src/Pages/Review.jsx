import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Navbar from '../Components/Navbar';
import React, { useEffect, useState } from 'react'
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';
import { addReview } from '../Services/ReviewService';
import { useNavigate } from 'react-router-dom';
import { retrieveToken } from '../Services/JwtToken';


const Review = () => {
  const navigater = useNavigate()
    const decodedToken = retrieveToken()
    const [user_id, setUser_id] = useState('')

    useEffect(() => {
        if(decodedToken){
            const id = decodedToken.id
            setUser_id(id)
        }
        else{
          setUser_id('')
        }
    }, [])

  const [review, setReview] = useState('')
  const [error, setError] = useState('')

  const [rating, setRating] = useState(0);
  const[apiResponse, setApiResponse] = useState('')

  const handleSubmit = async(e,review, rating, user_id) => {
    e.preventDefault()
    try{
      const reviewData = {
        review: review,
        rating : rating,
        user_Id : user_id
      }
      const response = await addReview(reviewData)
      if(response === 201){
        alert('review add successfully')
      }
      setApiResponse(response)
    }
    catch(error){
      console.log('error occur :',error)
    }
  }


  const handleStarClick = (star) => {
      if (rating === star) {
        const deleteRating = rating-1
        setRating(deleteRating);
    } else {
        setRating(star);
    }
  };
  
  return (
    <>
        <Navbar />
        <div className='container-fluid review'>
          <h1 className='text-center mt-5'>Please provide your valuable rating</h1>
          <div className="input">
            <div style={{ display: 'flex' }} className='stars'>
                {[1, 2, 3, 4, 5].map((star) => (
                    <span
                        key={star}
                        style={{
                            cursor: 'pointer',
                            fontSize: '24px',
                        }}
                        onClick={() => handleStarClick(star)}
                    >
                        <FontAwesomeIcon
                            icon={star <= rating ? faStar : faStarEmpty}
                            style={{ color: star <= rating ? 'gold' : 'gold' }}
                            size='3x'
                        />
                    </span>
                ))}
            </div>
            <p className='rating'>Rating given: {rating} out of 5</p>

            <form onSubmit={(e) => handleSubmit(e,review, rating, user_id)}>
              <textarea type="text" name="reviewMsg" id="reviewMsg" value={review} onChange={(e) => setReview(e.target.value)} placeholder='Write Something............'/>
              <button type='submit' className='btn btn-warning w-25 mt-3'>Submit</button>
            </form>
          </div>
        </div>
    </>
  )
}

export default Review