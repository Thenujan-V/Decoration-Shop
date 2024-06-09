import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';
import { addReview } from '../Services/ReviewService';
import { useNavigate } from 'react-router-dom';
import { retrieveToken } from '../Services/JwtToken';
import { toast } from 'react-toastify';

const Review = ({ show, handleClose }) => {
  const navigater = useNavigate();
  const decodedToken = retrieveToken();
  const [user_id, setUser_id] = useState('');

  useEffect(() => {
    if (decodedToken) {
      const id = decodedToken.id;
      setUser_id(id);

      const userRole = decodedToken.role;
      if (userRole === 'admin' || userRole === 'employee') {
        navigater('/unauthorized');
      }
    } else {
      setUser_id('');
    }
  }, []);

  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [apiResponse, setApiResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const reviewData = {
        review: review,
        rating: rating,
        user_Id: user_id
      };
      const response = await addReview(reviewData);
      if (response === 201) {
        toast.success('Review added successfully', {
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      setApiResponse(response);
      handleClose();
      navigater('/');
    } catch (error) {
      console.log('Error occurred:', error);
    }
  };

  const handleStarClick = (star) => {
    if (rating === star) {
      setRating(rating - 1);
    } else {
      setRating(star);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Please provide your valuable rating</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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

          <form onSubmit={handleSubmit}>
            <textarea
              type="text"
              name="reviewMsg"
              id="reviewMsg"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder='Write Something............'
              className='form-control'
            />
            <Button type='submit' className='btn btn-warning w-100 mt-3'>Submit</Button>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Review;
