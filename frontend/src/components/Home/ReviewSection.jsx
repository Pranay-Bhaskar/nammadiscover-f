import React from 'react';
import { useApp } from '../../store/AppContext';

const ReviewSection = () => {
    const { state, reviews } = useApp();
    const t = (en, kn) => state.language === 'en' ? en : kn;

    return (
        <section id="reviews-section" className="section">
            <div className="container">
                <div className="section-head text-center">
                    <div className="section-label">{t('Community Voices', 'ಸಮುದಾಯದ ಧ್ವನಿಗಳು')}</div>
                    <h2 className="section-title">{t('What Travelers Say', 'ಪ್ರಯಾಣಿಕರು ಏನು ಹೇಳುತ್ತಾರೆ')}</h2>
                </div>

                <div className="grid-2">
                    <div className="review-form">
                        <h4>{t('Add Your Story', 'ನಿಮ್ಮ ಕಥೆಯನ್ನು ಸೇರಿಸಿ')}</h4>
                        <div className="form-group">
                            <label>{t('Your Name', 'ನಿಮ್ಮ ಹೆಸರು')}</label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>{t('Which spot did you visit?', 'ಯಾವ ಸ್ಥಳಕ್ಕೆ ಭೇಟಿ ನೀಡಿದ್ದೀರಿ?')}</label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>{t('Share your experience', 'ನಿಮ್ಮ ಅನುಭವವನ್ನು ಹಂಚಿಕೊಳ್ಳಿ')}</label>
                            <textarea className="form-control"></textarea>
                        </div>
                        <button className="btn btn-primary w-full">{t('Submit Review', 'ವಿಮರ್ಶೆಯನ್ನು ಸಲ್ಲಿಸಿ')}</button>
                    </div>

                    <div className="reviews-list">
                        {reviews.slice(0, 3).map(rev => (
                            <div key={rev._id} className="review-card">
                                <div className="review-header">
                                    <div className="review-author">{rev.author}</div>
                                    <div className="review-date">{rev.date}</div>
                                </div>
                                <div className="review-place">{rev.place}</div>
                                <div className={`sentiment-badge sentiment-${rev.sentiment}`}>
                                    {rev.sentiment === 'positive' ? '😊 Positive' : rev.sentiment === 'negative' ? '😔 Negative' : '😐 Neutral'}
                                </div>
                                <p className="review-text">{rev.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ReviewSection;
