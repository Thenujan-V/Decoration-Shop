import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Navbar from '../Components/Navbar';
import React, { useState } from 'react'
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';


const Review = () => {
  const [review, setReview] = useState('')
  const [error, setError] = useState('')

  const [rating, setRating] = useState(0);

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

            <form>
              <textarea type="text" name="reviewMsg" id="reviewMsg" value={review} onChange={(e) => setReview(e.target.value)} placeholder='Write Something............'/>
            </form>
          </div>
        </div>
    </>
  )
}

export default Review