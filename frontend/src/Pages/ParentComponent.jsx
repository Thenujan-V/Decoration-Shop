import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Navbar from '../Components/Navbar';
import Review from './Review';
import { getLeastDelivery } from '../Services/OrderService';

const ParentComponent = () => {
  const [showReviewModal, setShowReviewModal] = useState(false);

  const handleShow = () => setShowReviewModal(true);
  const handleClose = () => setShowReviewModal(false);

  useEffect(() => {
    const checkDeliveryStatus = async () => {
        try {
            const deliveryDateStr = await getLeastDelivery();
            const deliveryDate = new Date(deliveryDateStr);
            const currentDate = new Date();
    
            const timeDifference = deliveryDate - currentDate; // Difference in milliseconds
            console.log('true :', currentDate)
    
            // Check if the difference is less than or equal to 12 hours (43,200,000 milliseconds)
            if (timeDifference <= 43200000 && timeDifference >= 0) {
              setShowReviewModal(true);
            }
          } catch (error) {
            console.error('Error fetching delivery date:', error);
          }
        }
        checkDeliveryStatus();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <Button variant="primary" onClick={handleShow}>
          Leave a Review
        </Button>
        <Review show={showReviewModal} handleClose={handleClose} />
      </div>
    </>
  );
};

export default ParentComponent;
