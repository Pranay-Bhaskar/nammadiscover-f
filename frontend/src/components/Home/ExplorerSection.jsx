import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import ExplorerForm from '../ExplorerForm';

const ExplorerSection = () => {
    const { state, explorers } = useApp();
    const [showForm, setShowForm] = useState(false);
    const t = (en, kn) => state.language === 'en' ? en : kn;

    return (
        <section id="explorer-section" className="section section-alt">
            <div className="container">
                <div className="section-head">
                    <div className="section-label">{t('Community', 'ಸಮುದಾಯ')}</div>
                    <h2 className="section-title">{t('Our Local Explorers', 'ನಮ್ಮ ಸ್ಥಳೀಯ ಅನ್ವೇಷಕರು')}</h2>
                </div>

                <div className="explorer-hero-band">
                    <div className="explorer-icon">🧭</div>
                    <div className="explorer-band-text">
                        <h3>{t('Become a Verified Explorer', 'ಪರಿಶೀಲಿಸಿದ ಅನ್ವೇಷಕರಾಗಿ')}</h3>
                        <p>{t('Share your local knowledge, help travelers, and earn the "Legend" badge.', 'ನಿಮ್ಮ ಸ್ಥಳೀಯ ಜ್ಞಾನವನ್ನು ಹಂಚಿಕೊಳ್ಳಿ, ಪ್ರಯಾಣಿಕರಿಗೆ ಸಹಾಯ ಮಾಡಿ ಮತ್ತು "ಲೆಜೆಂಡ್" ಬ್ಯಾಡ್ಜ್ ಗಳಿಸಿ.')}</p>
                    </div>
                    <button className="btn btn-primary" onClick={() => setShowForm(true)}>{t('Apply Now', 'ಈಗಲೇ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ')}</button>
                </div>

                <div className="explorer-profiles">
                    {explorers.map(exp => (
                        <div key={exp._id} className="explorer-card">
                            <div className="explorer-avatar">{exp.avatar}</div>
                            <div className="explorer-name">{exp.name}</div>
                            <div className="explorer-badge">{exp.badge}</div>
                            <div className="explorer-stats">
                                <span>📊 {exp.contributions} {t('Posts', 'ಪೋಸ್ಟ್‌ಗಳು')}</span>
                                <span>⭐ {exp.rating}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {showForm && <ExplorerForm onClose={() => setShowForm(false)} />}
        </section>
    );
};

export default ExplorerSection;
