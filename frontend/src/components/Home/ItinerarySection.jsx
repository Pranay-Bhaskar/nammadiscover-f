import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';

const ItinerarySection = () => {
    const { state, itinerary, setItinerary } = useApp();
    const [currentDay, setCurrentDay] = useState(1);

    const t = (en, kn) => state.language === 'en' ? en : kn;

    const removeFromItinerary = (id) => {
        setItinerary(prev => prev.filter(p => p._id !== id));
    };

    return (
        <section id="itinerary-section" className="section iti-disabled">

            {/* 🔥 INLINE CSS */}
            <style>{`
                .iti-disabled {
                    position: relative;
                    overflow: hidden;
                }

                /* 🔥 BLUR CONTENT */
                .iti-blur {
                    filter: blur(5px);
                    opacity: 0.4;
                    pointer-events: none;
                    user-select: none;
                }

                /* 🔥 OVERLAY */
                .iti-overlay {
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
                    background: linear-gradient(45deg, #22c55e, #06b6d4);
                    color: #fff;
                    border-radius: 30px;
                    box-shadow: 0 0 25px rgba(34, 197, 94, 0.6);
                    margin-bottom: 12px;
                    animation: glow 2s infinite ease-in-out;
                }

                .coming-text {
                    font-size: 1rem;
                    opacity: 0.85;
                    max-width: 320px;
                }

                @keyframes glow {
                    0% { box-shadow: 0 0 10px rgba(34,197,94,0.4); }
                    50% { box-shadow: 0 0 30px rgba(34,197,94,0.8); }
                    100% { box-shadow: 0 0 10px rgba(34,197,94,0.4); }
                }

                /* 🔥 FAKE DAY TABS STYLE */
                .day-tab {
                    opacity: 0.6;
                }

                .day-tab.active {
                    opacity: 1;
                }

                /* 🔥 LIST FADE */
                .iti-item {
                    opacity: 0.6;
                }

                /* 🔥 ACTION BUTTON FAKE */
                .iti-actions button {
                    opacity: 0.6;
                }
            `}</style>

            <div className="container">

                {/* 🔥 BLURRED CONTENT */}
                <div className="iti-blur">

                    <div className="section-head">
                        <div className="section-label">
                            {t('Trip Planner', 'ಪ್ರವಾಸ ಯೋಜಕ')}
                        </div>
                        <h2 className="section-title">
                            {t('Design Your Perfect Days', 'ನಿಮ್ಮ ಪರಿಪೂರ್ಣ ದಿನಗಳನ್ನು ಯೋಜಿಸಿ')}
                        </h2>
                    </div>

                    <div className="itinerary-layout">
                        
                        {/* LEFT PANEL */}
                        <div className="iti-panel">
                            <div className="day-tabs">
                                {[1, 2, 3].map(d => (
                                    <button 
                                        key={d} 
                                        className={`day-tab ${currentDay === d ? 'active' : ''}`}
                                    >
                                        {t(`Day ${d}`, `ದಿನ ${d}`)}
                                    </button>
                                ))}
                            </div>

                            <div className="iti-list">
                                {itinerary.length > 0 ? (
                                    itinerary.map((item) => (
                                        <div key={item._id} className="iti-item">
                                            <div>
                                                <div className="iti-item-name">
                                                    {item.displayName || item.name?.en}
                                                </div>
                                                <div className="iti-item-meta">
                                                    {item.city} • {item.category}
                                                </div>
                                            </div>
                                            <div className="iti-controls">
                                                <button>🗑️</button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-muted">
                                        {t(
                                            'Your itinerary is empty. Add spots from the Discover section!',
                                            'ನಿಮ್ಮ ಪ್ರವಾಸ ಯೋಜನೆ ಖಾಲಿಯಿದೆ.'
                                        )}
                                    </p>
                                )}
                            </div>

                            <div className="iti-actions">
                                <button className="btn btn-sm btn-primary">
                                    PDF {t('Export', 'ರಫ್ತು ಮಾಡಿ')}
                                </button>
                                <button className="btn btn-sm btn-ghost">
                                    {t('Share', 'ಹಂಚಿಕೊಳ್ಳಿ')}
                                </button>
                            </div>
                        </div>

                        {/* RIGHT PANEL */}
                        <div className="iti-info-card glass-panel" style={{ padding: '1.5rem' }}>
                            <h4>{t('Smart Suggestions', 'ಸ್ಮಾರ್ಟ್ ಸಲಹೆಗಳು')}</h4>
                            <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>
                                {t(
                                    'Based on your Day 1, we suggest adding',
                                    'ನಿಮ್ಮ 1ನೇ ದಿನದ ಆಧಾರದ ಮೇಲೆ, ನಾವು ಸೂಚಿಸುತ್ತೇವೆ:'
                                )}{' '}
                                <strong>{t('Mylari Dose', 'ಮೈಲಾರಿ ದೋಸೆ')}</strong>{' '}
                                {t('for breakfast.', 'ಬೆಳಗಿನ ಉಪಹಾರಕ್ಕಾಗಿ.')}
                            </p>
                        </div>
                    </div>
                </div>

                {/* 🔥 OVERLAY */}
                <div className="iti-overlay">
                    <div className="coming-badge">
                        {t('Coming Soon', 'ಶೀಘ್ರದಲ್ಲೇ')}
                    </div>

                    <div className="coming-text">
                        {t(
                            'Smart itinerary planning with AI suggestions and day-wise optimization is coming soon.',
                            'AI ಆಧಾರಿತ ಪ್ರವಾಸ ಯೋಜನೆ ಶೀಘ್ರದಲ್ಲೇ ಬರುತ್ತಿದೆ.'
                        )}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default ItinerarySection;
