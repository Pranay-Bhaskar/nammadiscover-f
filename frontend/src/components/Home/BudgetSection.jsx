import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import SpotCard from './SpotCard';

const BudgetSection = () => {
    const { state, locations } = useApp();
    const [budget, setBudget] = useState(500);

    const t = (en, kn) => state.language === 'en' ? en : kn;

    const filtered = locations.filter(loc => loc.budget <= budget).slice(0, 8);

    return (
        <section id="budget-section" className="section section-alt">
            <style>{`
                /* INFINITE SCROLL LOGIC */
                .budget-grid-wrapper {
                    overflow: hidden;
                    position: relative;
                    width: 100%;
                    padding: 2rem 0;
                }

                .budget-grid {
                    display: flex;
                    gap: 1.5rem;
                    width: max-content;
                    animation: budgetScrollLoop 40s linear infinite;
                    will-change: transform;
                }

                .budget-grid:hover {
                    animation-play-state: paused;
                }

                @keyframes budgetScrollLoop {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }

                .budget-grid > * {
                    min-width: 300px;
                    max-width: 320px;
                    flex-shrink: 0;
                    transition: all 0.4s ease;
                }

                .budget-grid > *:hover {
                    transform: translateY(-10px) scale(1.02);
                    z-index: 5;
                }

                /* EDGE FADE EFFECT */
                .budget-grid-wrapper::before,
                .budget-grid-wrapper::after {
                    content: "";
                    position: absolute;
                    top: 0;
                    width: 100px;
                    height: 100%;
                    z-index: 10;
                    pointer-events: none;
                }

                .budget-grid-wrapper::before {
                    left: 0;
                    background: linear-gradient(to right, #080d1a, transparent);
                }

                .budget-grid-wrapper::after {
                    right: 0;
                    background: linear-gradient(to left, #080d1a, transparent);
                }

                /* MOBILE RESPONSIVENESS */
                @media (max-width: 768px) {
                    .budget-grid {
                        animation: none;
                        overflow-x: auto;
                        width: 100%;
                        padding: 0 1rem;
                    }
                    .budget-grid-wrapper::before,
                    .budget-grid-wrapper::after {
                        display: none;
                    }
                }
            `}</style>

            <div className="container">
                <div className="section-head">
                    <div className="section-label">{t('Smart Budget', 'ಸ್ಮಾರ್ಟ್ ಬಜೆಟ್')}</div>
                    <h2 className="section-title">{t('Plan by Your Pocket', 'ನಿಮ್ಮ ಜೇಬಿಗೆ ಅನುಗುಣವಾಗಿ ಯೋಜಿಸಿ')}</h2>
                </div>

                <div className="budget-card-main">
                    <div className="budget-range-wrap" style={{ marginBottom: '2rem' }}>
                        <label htmlFor="budget-slider">
                            {t('Your max budget per spot', 'ಒಂದು ಸ್ಥಳದ ಗರಿಷ್ಠ ಬಜೆಟ್')}:
                        </label>
                        <input
                            id="budget-slider"
                            type="range"
                            min="50"
                            max="5000"
                            step="50"
                            value={budget}
                            onChange={(e) => setBudget(e.target.value)}
                        />
                        <span id="budget-val">₹{budget}</span>
                    </div>

                    {filtered.length > 0 ? (
                        <div className="budget-grid-wrapper">
                            <div className="budget-grid">

                                {[...filtered, ...filtered].map((loc, i) => (
                                    <SpotCard key={`${loc._id}-${i}`} spot={loc} />
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '3rem', opacity: 0.6 }}>
                            <p>{t('No spots found in this budget. Try increasing it!', 'ಈ ಬಜೆಟ್‌ನಲ್ಲಿ ಯಾವುದೇ ಸ್ಥಳಗಳು ಕಂಡುಬಂದಿಲ್ಲ. ಅದನ್ನು ಹೆಚ್ಚಿಸಲು ಪ್ರಯತ್ನಿಸಿ!')}</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default BudgetSection;