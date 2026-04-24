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
                    position: relative;
                    overflow: hidden;
                }

                /* 🔥 Blur entire content */
                .ai-blur {
                    filter: blur(6px);
                    opacity: 0.4;
                    pointer-events: none;
                    user-select: none;
                }

                /* 🔥 Overlay */
                .ai-overlay {
                    position: absolute;
                    inset: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                    z-index: 5;
                }

                /* 🔥 Coming soon badge (main focus) */
                .coming-badge {
                    padding: 8px 18px;
                    font-size: 12px;
                    font-weight: 800;
                    letter-spacing: 0.6px;
                    text-transform: uppercase;

                    background: linear-gradient(45deg, #6366f1, #8b5cf6);
                    color: #fff;

                    border-radius: 30px;
                    box-shadow: 0 0 25px rgba(139, 92, 246, 0.6);

                    margin-bottom: 12px;
                }

                .coming-text {
                    font-size: 1rem;
                    opacity: 0.85;
                    text-align: center;
                    max-width: 300px;
                }

                /* subtle animated glow */
                .coming-badge {
                    animation: glow 2s infinite ease-in-out;
                }

                @keyframes glow {
                    0% { box-shadow: 0 0 10px rgba(139,92,246,0.4); }
                    50% { box-shadow: 0 0 30px rgba(139,92,246,0.8); }
                    100% { box-shadow: 0 0 10px rgba(139,92,246,0.4); }
                }

                /* optional skeleton preview */
                .preview-cards {
                    display: flex;
                    gap: 10px;
                    margin-top: 20px;
                }

                .preview-card {
                    width: 80px;
                    height: 60px;
                    border-radius: 10px;
                    background: linear-gradient(
                        90deg,
                        rgba(255,255,255,0.05),
                        rgba(255,255,255,0.15),
                        rgba(255,255,255,0.05)
                    );
                    background-size: 200% 100%;
                    animation: shimmer 1.5s infinite;
                }

                @keyframes shimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }
            `}</style>

            <div className="container">
                
                {/* 🔥 BLURRED CONTENT */}
                <div className="ai-blur">
                    <div className="section-head text-center">
                        <div className="section-label">
                            {t('NammaBot AI', 'ನಮ್ಮಬೋಟ್ AI')}
                        </div>

                        <h2 className="section-title">
                            {t('Personalized Picks Just For You', 'ನಿಮಗಾಗಿಯೇ ವೈಯಕ್ತೀಕರಿಸಿದ ಆಯ್ಕೆಗಳು')}
                        </h2>
                    </div>

                    <div className="quiz-card">
                        <div className="quiz-options">
                            {options.map(opt => (
                                <button key={opt.id} className="quiz-option">
                                    {opt.label}
                                </button>
                            ))}
                        </div>

                        <button className="btn btn-primary">
                            {t('Generate My AI Picks', 'ನನ್ನ AI ಆಯ್ಕೆಗಳನ್ನು ತಯಾರಿಸಿ')}
                        </button>

                        <div className="preview-cards">
                            <div className="preview-card"></div>
                            <div className="preview-card"></div>
                            <div className="preview-card"></div>
                        </div>
                    </div>
                </div>

                {/* 🔥 VISIBLE OVERLAY */}
                <div className="ai-overlay">
                    <div className="coming-badge">
                        {t('Coming Soon', 'ಶೀಘ್ರದಲ್ಲೇ')}
                    </div>

                    <div className="coming-text">
                        {t(
                            'AI-powered travel recommendations are on the way. Stay tuned!',
                            'AI ಆಧಾರಿತ ಪ್ರವಾಸ ಸಲಹೆಗಳು ಶೀಘ್ರದಲ್ಲೇ ಬರುತ್ತಿವೆ.'
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AISection;
