import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';

const AISection = () => {
    const { state, locations } = useApp();
    const [selections, setSelections] = useState([]);
    const [picks, setPicks] = useState([]);

    const t = (en, kn) => state.language === 'en' ? en : kn;

    const options = [
        { id: 'foodie', label: '🍱 ' + t('Foodie', 'ಆಹಾರ ಪ್ರಿಯ') },
        { id: 'heritage', label: '🏛️ ' + t('History Buff', 'ಇತಿಹಾಸ ಪ್ರೇಮಿ') },
        { id: 'adventure', label: '🧗 ' + t('Adventures', 'ಸಾಹಸ ಪ್ರಿಯ') },
        { id: 'nature', label: '🌿 ' + t('Nature Lover', 'ಪ್ರಕೃತಿ ಪ್ರೇಮಿ') },
        { id: 'peace', label: '🧘 ' + t('Quiet & Peace', 'ಶಾಂತಿ ಮತ್ತು ನೆಮ್ಮದಿ') }
    ];

    const toggleOption = (id) => {
        setSelections(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    };

    const getRecommendations = () => {
        // Mock AI logic based on tags and category
        const recommended = locations.filter(loc => {
            const tags = loc.tags.map(t => t.toLowerCase());
            return selections.some(s => tags.includes(s) || loc.category.toLowerCase().includes(s));
        }).slice(0, 3);
        setPicks(recommended);
    };

    return (
        <section id="ai-section" className="section">
            <div className="container">
                <div className="section-head text-center">
                    <div className="section-label">{t('NammaBot AI', 'ನಮ್ಮಬೋಟ್ AI')}</div>
                    <h2 className="section-title">{t('Personalized Picks Just For You', 'ನಿಮಗಾಗಿಯೇ ವೈಯಕ್ತೀಕರಿಸಿದ ಆಯ್ಕೆಗಳು')}</h2>
                </div>

                <div className="quiz-card">
                    <h3 className="quiz-title">{t('What defines your travel style?', 'ನಿಮ್ಮ ಪ್ರಯಾಣದ ಶೈಲಿ ಯಾವುದು?')}</h3>
                    <p className="quiz-sub">{t('Select your preferences and let our AI find the perfect hidden gems.', 'ನಿಮ್ಮ ಆದ್ಯತೆಗಳನ್ನು ಆರಿಸಿ ಮತ್ತು ನಮ್ಮ AI ನಿಮಗಾಗಿ ಪರಿಪೂರ್ಣ ಸ್ಥಳಗಳನ್ನು ಹುಡುಕಲಿ.')}</p>
                    
                    <div className="quiz-options">
                        {options.map(opt => (
                            <button 
                                key={opt.id} 
                                className={`quiz-option ${selections.includes(opt.id) ? 'selected' : ''}`}
                                onClick={() => toggleOption(opt.id)}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                    
                    <button className="btn btn-primary" onClick={getRecommendations}>
                        ✨ {t('Generate My AI Picks', 'ನನ್ನ AI ಆಯ್ಕೆಗಳನ್ನು ತಯಾರಿಸಿ')}
                    </button>

                    {picks.length > 0 && (
                        <div className="ai-picks">
                            {picks.map(loc => (
                                <div key={loc._id} className="ai-pick-card">
                                    <div className="ai-reason">✨ {t('Perfect for your style', 'ನಿಮ್ಮ ಶೈಲಿಗೆ ಸೂಕ್ತವಾಗಿದೆ')}</div>
                                    <div className="ai-pick-name">{loc.displayName || loc.name?.en}</div>
                                    <div className="ai-pick-meta">{loc.city} • {loc.category}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default AISection;
