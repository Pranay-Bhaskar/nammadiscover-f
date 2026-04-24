import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';

const AISection = () => {
    const { state, locations } = useApp();
    const [selections, setSelections] = useState([]);
    const [picks, setPicks] = useState([]);

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
    };

    return (
        <section id="ai-section" className="section ai-disabled">
            
            {/* 🔥 INLINE CSS */}
            <style>{`
                .ai-disabled {
                    opacity: 0.6;
                    filter: grayscale(20%);
                    position: relative;
                    pointer-events: none;
                }

                .ai-disabled::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.6));
                    backdrop-filter: blur(2px);
                    pointer-events: none;
                }

                .coming-badge {
                    margin-left: 10px;
                    padding: 4px 10px;
                    font-size: 10px;
                    font-weight: 700;
                    letter-spacing: 0.5px;
                    text-transform: uppercase;
                    color: #fff;
                    background: linear-gradient(45deg, #6366f1, #8b5cf6);
                    border-radius: 20px;
                    box-shadow: 0 0 15px rgba(139, 92, 246, 0.4);
                }

                .quiz-card {
                    background: rgba(255,255,255,0.05);
                    border: 1px dashed rgba(255,255,255,0.2);
                    padding: 24px;
                    border-radius: 16px;
                    text-align: center;
                }

                .quiz-title {
                    font-size: 1.4rem;
                    font-weight: 600;
                }

                .quiz-sub {
                    opacity: 0.7;
                    margin-bottom: 20px;
                }

                .quiz-options {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;
                    justify-content: center;
                    margin-bottom: 20px;
                }

                .quiz-option {
                    padding: 8px 14px;
                    border-radius: 20px;
                    border: 1px solid rgba(255,255,255,0.2);
                    background: transparent;
                    color: white;
                    cursor: not-allowed;
                    opacity: 0.5;
                }

                .btn-primary {
                    opacity: 0.6;
                    cursor: not-allowed;
                }

                .section-title {
                    text-shadow: 0 0 20px rgba(255,255,255,0.1);
                }
            `}</style>

            <div className="container">
                <div className="section-head text-center">
                    
                    {/* 🔥 Heading with badge */}
                    <div className="section-label">
                        {t('NammaBot AI', 'ನಮ್ಮಬೋಟ್ AI')}
                        <span className="coming-badge">
                            {t('Coming Soon', 'ಶೀಘ್ರದಲ್ಲೇ')}
                        </span>
                    </div>

                    <h2 className="section-title">
                        {t(
                            'Personalized Picks Just For You',
                            'ನಿಮಗಾಗಿಯೇ ವೈಯಕ್ತೀಕರಿಸಿದ ಆಯ್ಕೆಗಳು'
                        )}
                    </h2>
                </div>

                <div className="quiz-card">
                    <h3 className="quiz-title">
                        {t(
                            'What defines your travel style?',
                            'ನಿಮ್ಮ ಪ್ರಯಾಣದ ಶೈಲಿ ಯಾವುದು?'
                        )}
                    </h3>

                    <p className="quiz-sub">
                        {t(
                            'Select your preferences and let our AI find the perfect hidden gems.',
                            'ನಿಮ್ಮ ಆದ್ಯತೆಗಳನ್ನು ಆರಿಸಿ ಮತ್ತು ನಮ್ಮ AI ನಿಮಗಾಗಿ ಪರಿಪೂರ್ಣ ಸ್ಥಳಗಳನ್ನು ಹುಡುಕಲಿ.'
                        )}
                    </p>

                    <div className="quiz-options">
                        {options.map(opt => (
                            <button
                                key={opt.id}
                                className={`quiz-option ${
                                    selections.includes(opt.id) ? 'selected' : ''
                                }`}
                                onClick={() => toggleOption(opt.id)}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>

                    <button
                        className="btn btn-primary"
                        onClick={getRecommendations}
                        disabled
                    >
                        {t(
                            'Generate My AI Picks',
                            'ನನ್ನ AI ಆಯ್ಕೆಗಳನ್ನು ತಯಾರಿಸಿ'
                        )}
                    </button>

                    {picks.length > 0 && (
                        <div className="ai-picks">
                            {picks.map(loc => (
                                <div key={loc._id} className="ai-pick-card">
                                    <div className="ai-reason">
                                        {t(
                                            'Perfect for your style',
                                            'ನಿಮ್ಮ ಶೈಲಿಗೆ ಸೂಕ್ತವಾಗಿದೆ'
                                        )}
                                    </div>
                                    <div className="ai-pick-name">
                                        {loc.displayName || loc.name?.en}
                                    </div>
                                    <div className="ai-pick-meta">
                                        {loc.city} • {loc.category}
                                    </div>
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
