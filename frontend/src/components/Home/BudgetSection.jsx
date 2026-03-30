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

                <div className="budget-card">
                    <div className="budget-range-wrap">
                        <label>{t('Your max budget per spot', 'ಒಂದು ಸ್ಥಳದ ಗರಿಷ್ಠ ಬಜೆಟ್')}:</label>
                        <input 
                            type="range" 
                            min="50" 
                            max="5000" 
                            step="50"
                            value={budget} 
                            onChange={(e) => setBudget(e.target.value)}
                            id="budget-slider" 
                        />
                        <span id="budget-val">₹{budget}</span>
                    </div>

                    <div className="spots-grid mt-3">
                        {filtered.length > 0 ? (
                            filtered.map(loc => <SpotCard key={loc._id} spot={loc} />)
                        ) : (
                            <p>{t('No spots found in this budget. Try increasing it!', 'ಈ ಬಜೆಟ್‌ನಲ್ಲಿ ಯಾವುದೇ ಸ್ಥಳಗಳು ಕಂಡುಬಂದಿಲ್ಲ. ಅದನ್ನು ಹೆಚ್ಚಿಸಲು ಪ್ರಯತ್ನಿಸಿ!')}</p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BudgetSection;
