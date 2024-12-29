import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './RatingsReviews.css'; // Import the provided CSS

const ProductRatings = () => {
  const { productId } = useParams(); // Get productId from the route params
  const [ratingsData, setRatingsData] = useState({
    averageRating: 0,
    ratingCount: 0,
    ratings: [],
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch ratings data
    const fetchRatings = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/products/ratings/${productId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch ratings data');
        }
        const data = await response.json();
        setRatingsData(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchRatings();
  }, [productId]); // Use productId instead of id

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!ratingsData.ratings.length) {
    return <div>Loading ratings...</div>;
  }

  const { averageRating, ratingCount, ratings } = ratingsData;

  return (
    <div className="ratings-reviews">
      <h2 className="section-title">Ratings & Reviews</h2>
      <div className="ratings-summary">
        <span className="average-rating">{averageRating}</span>
        <span className="total-ratings">({ratingCount} ratings)</span>
      </div>

      <div>
        {ratings.map((review, index) => (
          <div className="review" key={index}>
            <div className="review-header">
              <span className="review-rating">★ {review.rating}</span>
              <span className="review-title">{review.comment || 'No Comment Provided'}</span>
            </div>
            <p className="reviewer-name">{review.userId.fullName}</p>
            <p className="review-time">{review.createdAt}</p>
            <p className="review-location">Certified Buyer</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductRatings;
