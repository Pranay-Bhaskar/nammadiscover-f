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
        <section id="itinerary-section" className="section">
            <div className="container">
                <div className="section-head">
                    <div className="section-label">{t('Trip Planner', 'ಪ್ರವಾಸ ಯೋಜಕ')}</div>
                    <h2 className="section-title">{t('Design Your Perfect Days', 'ನಿಮ್ಮ ಪರಿಪೂರ್ಣ ದಿನಗಳನ್ನು ಯೋಜಿಸಿ')}</h2>
                </div>

                <div className="itinerary-layout">
                    <div className="iti-panel">
                        <div className="day-tabs">
                            {[1, 2, 3].map(d => (
                                <button 
                                    key={d} 
                                    className={`day-tab ${currentDay === d ? 'active' : ''}`}
                                    onClick={() => setCurrentDay(d)}
                                >
                                    {t(`Day ${d}`, `ದಿನ ${d}`)}
                                </button>
                            ))}
                        </div>

                        <div className="iti-list">
                            {itinerary.length > 0 ? (
                                itinerary.map((item, idx) => (
                                    <div key={item._id} className="iti-item">
                                        <div>
                                            <div className="iti-item-name">{item.displayName || item.name?.en}</div>
                                            <div className="iti-item-meta">{item.city} • {item.category}</div>
                                        </div>
                                        <div className="iti-controls">
                                            <button onClick={() => removeFromItinerary(item._id)}>🗑️</button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-muted">{t('Your itinerary is empty. Add spots from the Discover section!', 'ನಿಮ್ಮ ಪ್ರವಾಸ ಯೋಜನೆ ಖಾಲಿಯಿದೆ. ಅನ್ವೇಷಿಸಿ ವಿಭಾಗದಿಂದ ಸ್ಥಳಗಳನ್ನು ಸೇರಿಸಿ!')}</p>
                            )}
                        </div>

                        <div className="iti-actions">
                            <button className="btn btn-sm btn-primary">PDF {t('Export', 'ರಫ್ತು ಮಾಡಿ')}</button>
                            <button className="btn btn-sm btn-ghost">🔗 {t('Share', 'ಹಂಚಿಕೊಳ್ಳಿ')}</button>
                        </div>
                    </div>

                    <div className="iti-info-card glass-panel" style={{ padding: '1.5rem' }}>
                        <h4>{t('Smart Suggestions', 'ಸ್ಮಾರ್ಟ್ ಸಲಹೆಗಳು')}</h4>
                        <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>
                            {t('Based on your Day 1, we suggest adding', 'ನಿಮ್ಮ 1ನೇ ದಿನದ ಆಧಾರದ ಮೇಲೆ, ನಾವು ಇವುಗಳನ್ನು ಸೇರಿಸಲು ಸೂಚಿಸುತ್ತೇವೆ:')} <strong>{t('Mylari Dose', 'ಮೈಲಾರಿ ದೋಸೆ')}</strong> {t('for breakfast.', 'ಬೆಳಗಿನ ಉಪಹಾರಕ್ಕಾಗಿ.')}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ItinerarySection;
