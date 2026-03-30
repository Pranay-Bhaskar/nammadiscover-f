import { useState } from 'react';
import { useApp } from '../../store/AppContext';
import { postReview } from '../../services/mapApi';

export default function ReviewsTab({ reviews, locationId, onRefresh }) {
  const { t } = useApp();
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!name || !comment || !rating) return;
    setSubmitting(true);
    try {
      await postReview(locationId, { reviewerName: name, rating, comment });
      setName(''); setComment(''); setRating(0);
      onRefresh?.();
    } catch (e) { console.error(e); }
    finally { setSubmitting(false); }
  };

  const stars = (r) => '★'.repeat(Math.round(r)) + '☆'.repeat(5 - Math.round(r));

  return (
    <div>
      {reviews.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">💬</div>
          <div>{t.noReviews || 'No reviews yet. Be the first to review!'}</div>
        </div>
      ) : reviews.map(rev => (
        <div key={rev._id} className="review-card animate-fade">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span className="reviewer-name">{rev.reviewerName}</span>
            <span className="review-date">{new Date(rev.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="review-stars">{stars(rev.rating)} ({rev.rating})</div>
          <div className="review-text">{rev.comment}</div>
        </div>
      ))}

      {/* Write a review */}
      <div className="review-form">
        <div className="review-form-title">{t.writeReview || 'Write a Review'}</div>
        <div className="star-rating">
          {[1, 2, 3, 4, 5].map(s => (
            <span
              key={s}
              className={s <= (hoveredStar || rating) ? 'filled' : ''}
              onMouseEnter={() => setHoveredStar(s)}
              onMouseLeave={() => setHoveredStar(0)}
              onClick={() => setRating(s)}
            >★</span>
          ))}
        </div>
        <input className="form-input" placeholder={t.yourName || 'Your Name'} value={name} onChange={e => setName(e.target.value)} />
        <textarea className="form-textarea" placeholder={t.yourReview || 'Your Review'} value={comment} onChange={e => setComment(e.target.value)} />
        <button className="submit-btn" onClick={handleSubmit} disabled={submitting}>
          {submitting ? '...' : t.submitReview || 'Submit Review'}
        </button>
      </div>
    </div>
  );
}
