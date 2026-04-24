import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';

const AISection = () => {
    const { state, locations } = useApp();

    const [selections, setSelections] = useState([]);
    const [picks, setPicks] = useState([]);
    const [loading, setLoading] = useState(false);

    const t = (en, kn) => state.language === 'en' ? en : kn;

    const options = [
        { id: 'foodie', label: t('Foodie', 'ಆಹಾರ ಪ್ರಿಯ') },
        { id: 'heritage', label: t('History Buff', 'ಇತಿಹಾಸ ಪ್ರೇಮಿ') },
        { id: 'adventure', label: t('Adventures', 'ಸಾಹಸ ಪ್ರಿಯ') },
        { id: 'nature', label: t('Nature Lover', 'ಪ್ರಕೃತಿ ಪ್ರೇಮಿ') },
        { id: 'peace', label: t('Quiet & Peace', 'ಶಾಂತಿ ಮತ್ತು ನೆಮ್ಮದಿ') }
    ];

    const toggleOption = (id) => {
        setSelections(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    const getRecommendations = () => {
        setLoading(true);

        setTimeout(() => {
            const recommended = locations
                .filter(loc => {
                    const tags = loc.tags.map(t => t.toLowerCase());
                    return selections.some(
                        s =>
                            tags.includes(s) ||
                            loc.category.toLowerCase().includes(s)
                    );
                })
                .slice(0, 3);

            setPicks(recommended);
            setLoading(false);
        }, 1800); // fake AI delay
    };

    return (
        <section id="ai-section" className="section ai-disabled">

            <style>{`
                .ai-disabled {
                    position: relative;
                }

                .coming-badge {
                    margin-left: 10px;
                    padding: 4px 10px;
                    font-size: 10px;
                    font-weight: 700;
                    background: linear-gradient(45deg, #6366f1, #8b5cf6);
                    border-radius: 20px;
                }

                .quiz-option {
                    padding: 8px 14px;
                    border-radius: 20px;
                    border: 1px solid rgba(255,255,255,0.2);
                    background: transparent;
                    color: white;
                    cursor: pointer;
                    transition: 0.3s;
                }

                .quiz-option:hover {
                    background: rgba(255,255,255,0.1);
                }

                .quiz-option.selected {
                    background: #38bdf8;
                    color: black;
                }

                .ai-loader {
                    text-align: center;
                    margin-top: 20px;
                    font-size: 14px;
                    opacity: 0.8;
                    animation: pulse 1.5s infinite;
                }

                @keyframes pulse {
                    0% { opacity: 0.5; }
                    50% { opacity: 1; }
                    100% { opacity: 0.5; }
                }

                .skeleton-card {
                    height: 80px;
                    border-radius: 12px;
                    background: linear-gradient(
                        90deg,
                        rgba(255,255,255,0.05) 25%,
                        rgba(255,255,255,0.1) 50%,
                        rgba(255,255,255,0.05) 75%
                    );
                    background-size: 200% 100%;
                    animation: shimmer 1.5s infinite;
                    margin-top: 10px;
                }

                @keyframes shimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }

                .ai-pick-card {
                    padding: 14px;
                    border-radius: 12px;
                    margin-top: 10px;
                    background: rgba(255,255,255,0.05);
                    transition: 0.3s;
                }

                .ai-pick-card:hover {
                    transform: translateY(-3px);
                    background: rgba(255,255,255,0.1);
                }
            `}</style>

            <div className="container">
                <div className="section-head text-center">
                    <div className="section-label">
                        {t('NammaBot AI', 'ನಮ್ಮಬೋಟ್ AI')}
                        <span className="coming-badge">
                            {t('Coming Soon', 'ಶೀಘ್ರದಲ್ಲೇ')}
                        </span>
                    </div>

                    <h2 className="section-title">
                        {t('Personalized Picks Just For You', 'ನಿಮಗಾಗಿಯೇ ವೈಯಕ್ತೀಕರಿಸಿದ ಆಯ್ಕೆಗಳು')}
                    </h2>
                </div>

                <div className="quiz-card">
                    <h3>{t('What defines your travel style?', 'ನಿಮ್ಮ ಪ್ರಯಾಣದ ಶೈಲಿ ಯಾವುದು?')}</h3>

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
                        {t('Generate My AI Picks', 'ನನ್ನ AI ಆಯ್ಕೆಗಳನ್ನು ತಯಾರಿಸಿ')}
                    </button>

                    {loading && (
                        <>
                            <div className="ai-loader">
                                🤖 {t('Analyzing your vibe...', 'ನಿಮ್ಮ ಶೈಲಿಯನ್ನು ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...')}
                            </div>

                            <div className="skeleton-card"></div>
                            <div className="skeleton-card"></div>
                            <div className="skeleton-card"></div>
                        </>
                    )}

                    {!loading && picks.length > 0 && (
                        <div className="ai-picks">
                            {picks.map(loc => (
                                <div key={loc._id} className="ai-pick-card">
                                    <div>✨ {t('Perfect for your style', 'ನಿಮ್ಮ ಶೈಲಿಗೆ ಸೂಕ್ತವಾಗಿದೆ')}</div>
                                    <div>{loc.displayName || loc.name?.en}</div>
                                    <div>{loc.city} • {loc.category}</div>
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
