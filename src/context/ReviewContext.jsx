import React, { createContext, useContext, useState, useEffect } from 'react';

const ReviewContext = createContext();

export const useReviews = () => {
  const context = useContext(ReviewContext);
  if (!context) {
    throw new Error('useReviews must be used within a ReviewProvider');
  }
  return context;
};

export const ReviewProvider = ({ children }) => {
  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem('reviews');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('reviews', JSON.stringify(reviews));
  }, [reviews]);

  const addReview = (productId, reviewData) => {
    const newReview = {
      id: Date.now().toString(),
      productId,
      ...reviewData,
      createdAt: new Date().toISOString(),
    };
    setReviews((prev) => [...prev, newReview]);
    return newReview;
  };

  const getReviewsByProductId = (productId) => {
    return reviews.filter((review) => review.productId === productId);
  };

  const getAverageRating = (productId) => {
    const productReviews = getReviewsByProductId(productId);
    if (productReviews.length === 0) return 0;
    const sum = productReviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / productReviews.length).toFixed(1);
  };

  const deleteReview = (reviewId) => {
    setReviews((prev) => prev.filter((review) => review.id !== reviewId));
  };

  return (
    <ReviewContext.Provider value={{
      reviews,
      addReview,
      getReviewsByProductId,
      getAverageRating,
      deleteReview,
    }}>
      {children}
    </ReviewContext.Provider>
  );
};
