import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import SpotCard from './SpotCard';

const BudgetSection = () => {
    const { state, locations } = useApp();
    const [budget, setBudget] = useState(500);

    const t = (en, kn) => state.language === 'en' ? en : kn;

    const filtered = locations.filter(loc => loc.budget <= budget).slice(0, 8);

    return (
        <section id="budget-section" className="section section-alt budget-disabled">

            <style>{`
                /* 🔥 DISABLED WRAPPER */
                .budget-disabled {
                    position: relative;
                    overflow: hidden;
                }

                .budget-blur {
                    filter: blur(5px);
                    opacity: 0.4;
                    pointer-events: none;
                    user-select: none;
                }

                /* 🔥 OVERLAY */
                .budget-overlay {
                    position: absolute;
                    inset: 0;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    z-index: 5;
                    text-align: center;
                }

                .coming-badge {
                    padding: 8px 18px;
                    font-size: 12px;
                    font-weight: 800;
                    letter-spacing: 0.6px;
                    text-transform: uppercase;
                    background: linear-gradient(45deg, #f59e0b, #ef4444);
                    color: #fff;
                    border-radius: 30px;
                    box-shadow: 0 0 25px rgba(239, 68, 68, 0.6);
                    margin-bottom: 12px;
                    animation: glow 2s infinite ease-in-out;
                }

                .coming-text {
                    font-size: 1rem;
                    opacity: 0.85;
                    max-width: 320px;
                }

                @keyframes glow {
                    0% { box-shadow: 0 0 10px rgba(239,68,68,0.4); }
                    50% { box-shadow: 0 0 30px rgba(239,68,68,0.8); }
                    100% { box-shadow: 0 0 10px rgba(239,68,68,0.4); }
                }

                /* 🔥 SCROLL GRID */
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
                }

                /* EDGE FADE */
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

                /* 🔥 FAKE SLIDER LOOK */
                .fake-slider {
                    height: 6px;
                    border-radius: 10px;
                    background: linear-gradient(to right, #38bdf8 40%, rgba(255,255,255,0.1) 40%);
                    margin-top: 10px;
                }

                .budget-note {
                    font-size: 0.85rem;
                    opacity: 0.7;
                    margin-top: 8px;
                }

                @media (max-width: 768px) {
                    .budget-grid {
                        animation: none;
                        overflow-x: auto;
                        width: 100%;
                        padding: 0 1rem;
                    }
                }
            `}</style>

            <div className="container">

                {/* 🔥 BLURRED CONTENT */}
                <div className="budget-blur">
                    <div className="section-head">
                        <div className="section-label">
                            {t('Smart Budget', 'ಸ್ಮಾರ್ಟ್ ಬಜೆಟ್')}
                        </div>
                        <h2 className="section-title">
                            {t('Plan by Your Pocket', 'ನಿಮ್ಮ ಜೇಬಿಗೆ ಅನುಗುಣವಾಗಿ ಯೋಜಿಸಿ')}
                        </h2>
                    </div>

                    <div className="budget-card-main">

                        {/* 🔥 FAKE SLIDER */}
                        <div style={{ marginBottom: '2rem' }}>
                            <label>
                                {t('Your max budget per spot', 'ಒಂದು ಸ್ಥಳದ ಗರಿಷ್ಠ ಬಜೆಟ್')}:
                            </label>
                            <div className="fake-slider"></div>
                            <div className="budget-note">
                                ₹500 → {t('Budget optimized picks', 'ಬಜೆಟ್‌ಗೆ ಹೊಂದುವ ಆಯ್ಕೆಗಳು')}
                            </div>
                        </div>

                        <div className="budget-grid-wrapper">
                            <div className="budget-grid">
                                {[...filtered, ...filtered].map((loc, i) => (
                                    <SpotCard key={`${loc._id}-${i}`} spot={loc} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 🔥 OVERLAY */}
                <div className="budget-overlay">
                    <div className="coming-badge">
                        {t('Coming Soon', 'ಶೀಘ್ರದಲ್ಲೇ')}
                    </div>

                    <div className="coming-text">
                        {t(
                            'Smart budget-based travel planning is on the way. Discover the best places within your budget.',
                            'ನಿಮ್ಮ ಬಜೆಟ್‌ಗೆ ಹೊಂದುವ ಸ್ಥಳಗಳನ್ನು ಶೀಘ್ರದಲ್ಲೇ ಕಂಡುಹಿಡಿಯಿರಿ.'
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BudgetSection;
