import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import SpotCard from './SpotCard';

const BudgetSection = () => {
    const { state, locations } = useApp();
    const [budget, setBudget] = useState(500);

    const t = (en, kn) => state.language === 'en' ? en : kn;

    const filtered = locations.filter(loc => loc.budget <= budget).slice(0, 4);

    return (
        <section id="budget-section" className="section section-alt">
            <div className="container">
                <div className="section-head">
                    <div className="section-label">{t('Smart Budget', 'ಸ್ಮಾರ್ಟ್ ಬಜೆಟ್')}</div>
                    <h2 className="section-title">{t('Plan by Your Pocket', 'ನಿಮ್ಮ ಜೇಬಿಗೆ ಅನುಗುಣವಾಗಿ ಯೋಜಿಸಿ')}</h2>
                </div>

                <div className="budget-card" style={{ width: '100%', overflow: 'hidden' }}>
                    
                    <div className="budget-range-wrap">
                        <label htmlFor="budget-slider">
                            {t('Your max budget per spot', 'ಒಂದು ಸ್ಥಳದ ಗರಿಷ್ಠ ಬಜೆಟ್')}:
                        </label>
                        <input
                            id="budget-slider"
                            name="budget"
                            type="range"
                            min="50"
                            max="5000"
                            step="50"
                            value={budget}
                            onChange={(e) => setBudget(e.target.value)}
                        />
                        <span id="budget-val">₹{budget}</span>
                    </div>

                  
                    <div 
                        className="spots-grid mt-3 custom-scrollbar" 
                        style={{ 
                            display: 'flex', 
                            flexWrap: 'nowrap', 
                            gap: '1.2rem', 
                            width: '100%',
                            overflowX: 'auto',
                            paddingBottom: '1rem',
                            WebkitOverflowScrolling: 'touch' 
                        }}
                    >
                        {filtered.length > 0 ? (
                            filtered.map(loc => (
                                <div 
                                    key={loc._id} 
                                    style={{ 
                                        flex: '0 0 auto', 
                                        width: '300px'    
                                    }}
                                >
                                    <SpotCard spot={loc} />
                                </div>
                            ))
                        ) : (
                            <p style={{ width: '100%', textAlign: 'center', padding: '2rem', color: 'rgba(255,255,255,0.6)' }}>
                                {t('No spots found in this budget. Try increasing it!', 'ಈ ಬಜೆಟ್‌ನಲ್ಲಿ ಯಾವುದೇ ಸ್ಥಳಗಳು ಕಂಡುಬಂದಿಲ್ಲ. ಅದನ್ನು ಹೆಚ್ಚಿಸಲು ಪ್ರಯತ್ನಿಸಿ!')}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            
            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    height: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 107, 53, 0.3);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 107, 53, 0.5);
                }
            `}</style>
        </section>
    );
};

export default BudgetSection;