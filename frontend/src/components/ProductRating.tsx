import React, { useState } from 'react';
import { Star, MessageCircle, ThumbsUp, User } from 'lucide-react';

interface ProductRatingProps {
  productId: string;
  currentRating: number;
  totalReviews: number;
  onRatingSubmit: (rating: number, review: string) => void;
}

const ProductRating: React.FC<ProductRatingProps> = ({ 
  productId, 
  currentRating, 
  totalReviews, 
  onRatingSubmit 
}) => {
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);

  const mockReviews = [
    {
      id: '1',
      userName: 'Priya Sharma',
      rating: 5,
      review: 'Excellent quality! I have been using this for 3 months and can see significant improvement in my health.',
      date: new Date('2024-12-10'),
      helpful: 12
    },
    {
      id: '2',
      userName: 'Rajesh Kumar',
      rating: 4,
      review: 'Good product, authentic Ayurvedic medicine. Packaging could be better but the product quality is top-notch.',
      date: new Date('2024-12-08'),
      helpful: 8
    },
    {
      id: '3',
      userName: 'Anita Patel',
      rating: 5,
      review: 'Amazing results! My digestion has improved significantly. Will definitely order again.',
      date: new Date('2024-12-05'),
      helpful: 15
    }
  ];

  const handleRatingClick = (rating: number) => {
    setUserRating(rating);
    setShowReviewForm(true);
  };

  const handleSubmitReview = () => {
    if (userRating > 0) {
      onRatingSubmit(userRating, review);
      setUserRating(0);
      setReview('');
      setShowReviewForm(false);
    }
  };

  const renderStars = (rating: number, interactive: boolean = false) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 cursor-pointer transition-colors ${
          index < (interactive ? (hoverRating || userRating) : rating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        }`}
        onClick={interactive ? () => handleRatingClick(index + 1) : undefined}
        onMouseEnter={interactive ? () => setHoverRating(index + 1) : undefined}
        onMouseLeave={interactive ? () => setHoverRating(0) : undefined}
      />
    ));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Customer Reviews</h3>
      
      {/* Overall Rating */}
      <div className="flex items-center space-x-4 mb-6 p-4 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg">
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-900">{currentRating}</div>
          <div className="flex items-center justify-center mb-1">
            {renderStars(currentRating)}
          </div>
          <div className="text-sm text-gray-600">{totalReviews} reviews</div>
        </div>
        
        <div className="flex-1">
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((stars) => (
              <div key={stars} className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 w-8">{stars}★</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-yellow-400 h-2 rounded-full" 
                    style={{ width: `${Math.random() * 80 + 10}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600 w-8">{Math.floor(Math.random() * 50)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Rate this product */}
      <div className="border-t border-gray-200 pt-6 mb-6">
        <h4 className="font-semibold text-gray-900 mb-3">Rate this product</h4>
        <div className="flex items-center space-x-2 mb-4">
          {renderStars(userRating, true)}
          <span className="text-sm text-gray-600 ml-2">
            {userRating > 0 ? `${userRating} star${userRating > 1 ? 's' : ''}` : 'Click to rate'}
          </span>
        </div>
        
        {showReviewForm && (
          <div className="space-y-4">
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Share your experience with this product..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
              rows={4}
            />
            <div className="flex space-x-3">
              <button
                onClick={handleSubmitReview}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Submit Review
              </button>
              <button
                onClick={() => {
                  setShowReviewForm(false);
                  setUserRating(0);
                  setReview('');
                }}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        <h4 className="font-semibold text-gray-900">Customer Reviews</h4>
        {mockReviews.map((review) => (
          <div key={review.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h5 className="font-medium text-gray-900">{review.userName}</h5>
                  <div className="flex items-center">
                    {renderStars(review.rating)}
                  </div>
                  <span className="text-sm text-gray-500">
                    {review.date.toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-700 mb-3 leading-relaxed">{review.review}</p>
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-emerald-600 transition-colors">
                    <ThumbsUp className="w-4 h-4" />
                    <span>Helpful ({review.helpful})</span>
                  </button>
                  <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-emerald-600 transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    <span>Reply</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductRating;